import * as d3 from 'd3';
import * as Highcharts from 'highcharts';
import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'line-chart',
    template: ``
})
export class LineChart implements AfterViewInit {
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
        this.render();
    }

    protected accumulation(data) {
        return (data || []).reduce((a, v) => { a[0].push(a[1] + v); a[1] = a[1] + v; return a; }, [[], 0])[0];
    }

    protected render() {
        Highcharts.chart(this.elementRef.nativeElement, {
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                    name: 'New York',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                    name: 'Berlin',
                    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }
            ]
        });
    }
}