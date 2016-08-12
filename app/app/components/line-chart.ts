import * as d3 from 'd3';
import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'line-chart',
    template: ``

})
export class LineChart implements AfterViewInit {
    @Input()
    private data;

    private progressNode: any;
    private textNode: any;
    private progress: number = Math.random();
    private animationDuration: number = 400;
    private animationDelay: number = Math.random() * 1000;
    private twoPi = 2 * Math.PI;
    private formatPercent: Function = d3.format('.0%');
    private colors = ['#e91e63', '#2196f3', '#ff3d00', '#4caf50'];

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        setTimeout(function () {
            this.render();
        }.bind(this), 2000)
    }

    protected accumulation(data) {
        return (data || []).reduce((a, v) => { a[0].push(a[1] + v); a[1] = a[1] + v; return a; }, [[], 0])[0];
    }

    protected render() {
        let projection: any = this.accumulation([0, 10, 10, 10, 30]);
        let data: any = this.accumulation([0, 10, 20, 10, 30]),
            w = 300,
            h = 200,
            margin = 20,
            y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]),
            x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin])

        let vis = d3.select(this.elementRef.nativeElement)
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)

        let g = vis.append("svg:g")
            .attr("transform", "translate(0, 200)");

        let line = d3.svg.line()
            .x(function (d, i) { return x(i); })
            .y(function (d: any) { return -1 * y(d); })

        g.append("svg:path").attr("d", line(data));
        g.append("svg:path").attr("d", line(projection));


        g.append("svg:line")
            .attr("x1", x(0))
            .attr("y1", -1 * y(0))
            .attr("x2", x(w))
            .attr("y2", -1 * y(0))

        // g.append("svg:line")
        //     .attr("x1", x(0))
        //     .attr("y1", -1 * y(0))
        //     .attr("x2", x(0))
        //     .attr("y2", -1 * y(d3.max(data)))

        g.selectAll(".xLabel")
            .data(x.ticks(5))
            .enter().append("svg:text")
            .attr("class", "xLabel")
            .text(String)
            .attr("x", function (d) { return x(d) })
            .attr("y", 0)
            .attr("text-anchor", "middle")

        g.selectAll(".yLabel")
            .data(y.ticks(4))
            .enter().append("svg:text")
            .attr("class", "yLabel")
            .text(String)
            .attr("x", 0)
            .attr("y", function (d) { return -1 * y(d) })
            .attr("text-anchor", "right")
            .attr("dy", 0)

        g.selectAll(".xTicks")
            .data(x.ticks(5))
            .enter().append("svg:line")
            .attr("class", "xTicks")
            .attr("x1", function (d) { return x(d); })
            .attr("y1", -1 * y(0))
            .attr("x2", function (d) { return x(d); })
            .attr("y2", -1 * y(-0.3))

        // g.selectAll(".yTicks")
        //     .data(y.ticks(4))
        //     .enter().append("svg:line")
        //     .attr("class", "yTicks")
        //     .attr("y1", function (d) { return -1 * y(d); })
        //     .attr("x1", x(-0.3))
        //     .attr("y2", function (d) { return -1 * y(d); })
        //     .attr("x2", x(0))

    }
}