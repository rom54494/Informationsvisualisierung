var App = App || {};

App.TrafficTypeView = function(options){
	"use strict";
	var data, chart;

	/**
		Right now I don't know how to prevent the default behaviour of legendhover
	*/
	function onLegendHover(id){
		//chart.focus(id);
		//chart.tooltip.show(id);
		//chart.legend.show(id);
	}

	function onDataClick(d, element){
		chart.unselect([d.id]);
		chart.hide(d.id);
	}

	function formatJSON(original){
		var toReturn = [];
		var tmp = [];

		for(var i = 0; i < original.length; i++){
			tmp.push(original[i].code);
			tmp.push(original[i].count);
			toReturn[i] = tmp;
			tmp = [];
		}

		return toReturn;
	}

	function setData(newData){
		data = formatJSON(newData);
		initChart();
	}

	function initChart(){
		chart = c3.generate({
			bindto: options.chartContainer,
			data: {
				columns: data,
	            keys: {
	            	x: "code",
	            	value: ["count"]
	            },
	        	type: 'pie',
  				onclick: onDataClick
	        },
	        axis: {
	        	x:{
	        		type: "category"
	        	}
	        },
	        pie: {
	        	label: {
	            	format: function (value, ratio, id) {
	             		return d3.format("^,")(value);
	            	}
	        	}
	   	 	},
	   	 	legend: {
	   	 		position: "right",
	  			item: {
	    			onmouseover: onLegendHover
	  			}
			}
		});
	}


	return {
		setData: setData
	}
};