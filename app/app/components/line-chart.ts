import * as d3 from 'd3';
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

        var title = 'Science vs Style - Daily Leanpub Book Sales';

        var margin = { top: 20, right: 20, bottom: 50, left: 50 },
            width = 380 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        var parsedtg = d3.time.format('%Y-%m-%d').parse;

        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat(d3.time.format(''));
        var yAxis = d3.svg.axis().scale(y).orient('left');

        var lineScience = d3.svg.area()
            .interpolate('basis')
            .x(function (d: any) { return x(d.dtg); })
            .y(function (d: any) { return y(d['Science']); });

        var lineStyle = d3.svg.area()
            .interpolate('basis')
            .x(function (d: any) { return x(d.dtg); })
            .y(function (d: any) { return y(d['Style']); });

        var area = d3.svg.area()
            .interpolate('basis')
            .x(function (d: any) { return x(d.dtg); })
            .y1(function (d: any) { return y(d['Science']); });

        var svg = d3.select(this.elementRef.nativeElement).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');

        let dataNest = this.data;

        dataNest.forEach(function (d: any) {
            d.dtg = parsedtg(d.date_entered);
            d.downloaded = +d.downloaded;
        });

        var data: any = d3.nest()
            .key(function (d: any) { return d.dtg; })
            .entries(dataNest);

        data.forEach(function (d: any) {
            d.dtg = d.values[0]['dtg'];
            d['Science'] = d.values[0]['downloaded'];
            d['Style'] = d.values[1]['downloaded'];
        });

        for (let i: any = data.length - 1; i > 0; i--) {
            data[i].Science = data[i].Science - data[(i - 1)].Science;
            data[i].Style = data[i].Style - data[(i - 1)].Style;
        }

        data.shift(); // Removes the first element in the array

        x.domain(d3.extent(data, function (d: any) { return d.dtg; }));
        y.domain([
            //      d3.min(data, function(d) {
            //          return Math.min(d['Science'], d['Style']); }),
            //      d3.max(data, function(d) {
            //          return Math.max(d['Science'], d['Style']); })
            0, 1400
        ]);

        svg.datum(data);

        svg.append('clipPath')
            .attr('id', 'clip-above')
            .append('path')
            .attr('d', area.y0(0));

        svg.append('clipPath')
            .attr('id', 'clip-below')
            .append('path')
            .attr('d', area.y0(height));

        svg.append('path')
            .attr('class', 'area above')
            .attr('clip-path', 'url(#clip-above)')
            .attr('d', area.y0(function (d: any) { return y(d['Style']); }));

        svg.append('path')
            .attr('class', 'area below')
            .attr('clip-path', 'url(#clip-below)')
            .attr('d', area.y0(function (d: any) { return y(d['Style']); }));

        svg.append('path')
            .attr('class', 'line')
            .style('stroke', 'darkgreen')
            .attr('d', lineScience);

        svg.append('path')
            .attr('class', 'line')
            .style('stroke', 'red')
            .attr('d', lineStyle);

        // svg.append('g')
        //     .attr('class', 'x axis')
        //     .attr('transform', 'translate(0,' + height + ')')
        //     .call(xAxis)
        //     .selectAll('text')
        //     .attr('y', 20)
        //     .attr('x', 0)
        //     .attr('dy', '-.35em')
        //     .attr('transform', 'rotate(-45)')
        //     .style('text-anchor', 'start');

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
    }

    get data() {
        return [
            {
                'date_entered': '2015-04-19',
                'downloaded': 5481,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-19',
                'downloaded': 23751,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-20',
                'downloaded': 5691,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-20',
                'downloaded': 23782,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-21',
                'downloaded': 6379,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-21',
                'downloaded': 23820,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-22',
                'downloaded': 7281,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-22',
                'downloaded': 23857,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-23',
                'downloaded': 7554,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-23',
                'downloaded': 23881,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-24',
                'downloaded': 9331,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-24',
                'downloaded': 23932,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-25',
                'downloaded': 9614,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-25',
                'downloaded': 23961,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-26',
                'downloaded': 9785,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-26',
                'downloaded': 23978,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-27',
                'downloaded': 9951,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-27',
                'downloaded': 24001,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-28',
                'downloaded': 10087,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-28',
                'downloaded': 24018,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-29',
                'downloaded': 11039,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-29',
                'downloaded': 24061,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-04-30',
                'downloaded': 11906,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-04-30',
                'downloaded': 24102,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-01',
                'downloaded': 12210,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-01',
                'downloaded': 24130,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-02',
                'downloaded': 12424,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-02',
                'downloaded': 24148,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-03',
                'downloaded': 12588,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-03',
                'downloaded': 24160,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-04',
                'downloaded': 12903,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-04',
                'downloaded': 24181,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-05',
                'downloaded': 13198,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-05',
                'downloaded': 24229,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-06',
                'downloaded': 13445,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-06',
                'downloaded': 24260,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-07',
                'downloaded': 13646,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-07',
                'downloaded': 24508,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-08',
                'downloaded': 13853,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-08',
                'downloaded': 25220,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-09',
                'downloaded': 13967,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-09',
                'downloaded': 25327,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-10',
                'downloaded': 14084,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-10',
                'downloaded': 25408,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-11',
                'downloaded': 14216,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-11',
                'downloaded': 25475,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-12',
                'downloaded': 15302,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-12',
                'downloaded': 25560,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-13',
                'downloaded': 15674,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-13',
                'downloaded': 25602,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-14',
                'downloaded': 15995,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-14',
                'downloaded': 25648,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-15',
                'downloaded': 16209,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-15',
                'downloaded': 25681,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-16',
                'downloaded': 16388,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-16',
                'downloaded': 25714,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-17',
                'downloaded': 16527,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-17',
                'downloaded': 25737,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-18',
                'downloaded': 16705,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-18',
                'downloaded': 25759,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-19',
                'downloaded': 16856,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-19',
                'downloaded': 25777,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-20',
                'downloaded': 17006,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-20',
                'downloaded': 25803,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-21',
                'downloaded': 17124,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-21',
                'downloaded': 25821,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-22',
                'downloaded': 17253,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-22',
                'downloaded': 25836,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-23',
                'downloaded': 17341,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-23',
                'downloaded': 25850,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-24',
                'downloaded': 17424,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-24',
                'downloaded': 25865,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-25',
                'downloaded': 17522,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-25',
                'downloaded': 25884,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-26',
                'downloaded': 17643,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-26',
                'downloaded': 25901,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-27',
                'downloaded': 17791,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-27',
                'downloaded': 25911,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-28',
                'downloaded': 17948,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-28',
                'downloaded': 25927,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-29',
                'downloaded': 18071,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-29',
                'downloaded': 25934,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-30',
                'downloaded': 18192,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-30',
                'downloaded': 25944,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-05-31',
                'downloaded': 18299,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-05-31',
                'downloaded': 25951,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-01',
                'downloaded': 18541,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-01',
                'downloaded': 25966,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-02',
                'downloaded': 18838,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-02',
                'downloaded': 25982,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-03',
                'downloaded': 19032,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-03',
                'downloaded': 25984,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-04',
                'downloaded': 19157,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-04',
                'downloaded': 25995,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-05',
                'downloaded': 19302,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-05',
                'downloaded': 26006,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-06',
                'downloaded': 19399,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-06',
                'downloaded': 26019,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-07',
                'downloaded': 19497,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-07',
                'downloaded': 26028,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-08',
                'downloaded': 19602,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-08',
                'downloaded': 26042,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-09',
                'downloaded': 20445,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-09',
                'downloaded': 26715,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-10',
                'downloaded': 20773,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-10',
                'downloaded': 26902,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-11',
                'downloaded': 21005,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-11',
                'downloaded': 26984,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-12',
                'downloaded': 21185,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-12',
                'downloaded': 27019,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-13',
                'downloaded': 21331,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-13',
                'downloaded': 27045,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-14',
                'downloaded': 21462,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-14',
                'downloaded': 27078,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-15',
                'downloaded': 21609,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-15',
                'downloaded': 27103,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-16',
                'downloaded': 21751,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-16',
                'downloaded': 27137,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-17',
                'downloaded': 21904,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-17',
                'downloaded': 27157,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-18',
                'downloaded': 22083,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-18',
                'downloaded': 27190,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-19',
                'downloaded': 22244,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-19',
                'downloaded': 27213,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-20',
                'downloaded': 22349,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-20',
                'downloaded': 27227,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-21',
                'downloaded': 22447,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-21',
                'downloaded': 27239,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-22',
                'downloaded': 22557,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-22',
                'downloaded': 27254,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-23',
                'downloaded': 22699,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-23',
                'downloaded': 28492,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-24',
                'downloaded': 22836,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-24',
                'downloaded': 28907,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-25',
                'downloaded': 22955,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-25',
                'downloaded': 29153,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-26',
                'downloaded': 23061,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-26',
                'downloaded': 29316,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-27',
                'downloaded': 23283,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-27',
                'downloaded': 29546,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-28',
                'downloaded': 23500,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-28',
                'downloaded': 29753,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-29',
                'downloaded': 23755,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-29',
                'downloaded': 30044,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-06-30',
                'downloaded': 24034,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-06-30',
                'downloaded': 30232,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-01',
                'downloaded': 24238,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-01',
                'downloaded': 30377,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-02',
                'downloaded': 24408,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-02',
                'downloaded': 30464,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-03',
                'downloaded': 24572,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-03',
                'downloaded': 30527,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-04',
                'downloaded': 24708,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-04',
                'downloaded': 30584,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-05',
                'downloaded': 24849,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-05',
                'downloaded': 30625,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-06',
                'downloaded': 25102,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-06',
                'downloaded': 30694,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-07',
                'downloaded': 25429,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-07',
                'downloaded': 30748,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-08',
                'downloaded': 25685,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-08',
                'downloaded': 30891,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-09',
                'downloaded': 25874,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-09',
                'downloaded': 31245,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-10',
                'downloaded': 26589,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-10',
                'downloaded': 31377,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-11',
                'downloaded': 26983,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-11',
                'downloaded': 31468,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-12',
                'downloaded': 27258,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-12',
                'downloaded': 31563,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-13',
                'downloaded': 27602,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-13',
                'downloaded': 31632,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-14',
                'downloaded': 27835,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-14',
                'downloaded': 31703,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-15',
                'downloaded': 28068,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-15',
                'downloaded': 31776,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-16',
                'downloaded': 28395,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-16',
                'downloaded': 31874,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-17',
                'downloaded': 28601,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-17',
                'downloaded': 31924,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-18',
                'downloaded': 28734,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-18',
                'downloaded': 31968,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-19',
                'downloaded': 28857,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-19',
                'downloaded': 31995,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-20',
                'downloaded': 29017,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-20',
                'downloaded': 32031,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-21',
                'downloaded': 29213,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-21',
                'downloaded': 32070,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-22',
                'downloaded': 29415,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-22',
                'downloaded': 32109,
                'book_name': 'The Elements of Data Analytic Style'
            },
            {
                'date_entered': '2015-07-23',
                'downloaded': 29493,
                'book_name': 'R Programming for Data Science'
            },
            {
                'date_entered': '2015-07-23',
                'downloaded': 32127,
                'book_name': 'The Elements of Data Analytic Style'
            }
        ];
    }
}