import * as d3 from 'd3';
import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'pie-chart',
    template: `
    `
})
export class PieChart {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        this.render();
    }

    render() {
        var width = 300,
            height = 300,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range([
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#36e5eb',
                '#bbdc2c'
            ]);

        var arc: any = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d: any) { return d.value; });

        var svg = d3.select(this.elementRef.nativeElement).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


        var g = svg.selectAll('.arc')
            .data(pie(this.data))
            .enter().append('g')
            .attr('class', 'arc');

        g.append('path')
            .attr('d', arc)
            .style('fill', function (d: any): any { return color(d.data.text); });

        g.append('text')
            .attr('transform', function (d: any) { return 'translate(' + labelArc.centroid(d) + ')'; })
            .attr('dy', '.35em')
            .text(function (d: any) { return d.data.text; });


        function type(d) {
            d.value = +d.value;
            return d;
        }
    }

    get data(): any {
        return [
            { text: 'Savings', value: 2704659 },
            { text: 'Housing', value: 4499890 },
            { text: 'Lifestyle', value: 2159981 },
            { text: 'Transportation', value: 3853788 },
            { text: 'Others', value: 14106543 }
        ];
    }
}