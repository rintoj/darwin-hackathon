import { Component, ElementRef } from '@angular/core';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
    selector: 'pie-chart',
    template: `
        <base-chart class="chart"
           [datasets]="chartData"
           [labels]="chartLabels"
           [options]="chartOptions"
           [legend]="chartLegend"
           [chartType]="chartType"></base-chart>
    `
})
export class PieChart {

    private data = {
        labels: [
            "Red",
            "Blue",
            "Yellow"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    public chartData: any[] = [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }
    ];

    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public chartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public chartType: string = 'pie';
    public chartLegend: boolean = false;

    // public chartData: any[] = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    // ];

}