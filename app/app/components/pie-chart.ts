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
            .range(['#FF6384',
                    '#36A2EB',
                    '#FFCE56']);

        var arc: any = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d: any) { return d.population; });

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
            .style('fill', function (d: any): any { return color(d.data.age); });

        g.append('text')
            .attr('transform', function (d: any) { return 'translate(' + labelArc.centroid(d) + ')'; })
            .attr('dy', '.35em')
            .text(function (d: any) { return d.data.age; });


        function type(d) {
            d.population = +d.population;
            return d;
        }
    }

    get data(): any {
        return [
            { age: 'Savings', population: 2704659 },
            { age: 'Housing', population: 4499890 },
            { age: 'Lifestyle', population: 2159981 },
            { age: 'Transportation', population: 3853788 },
            { age: 'Others', population: 14106543 }
        ];
    }
}