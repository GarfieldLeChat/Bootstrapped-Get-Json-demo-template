$('document').ready(function(){
	// doc ready
	
	$('.search-button').on('click', function(e){
		//console.log("clicked");
		e.preventDefault();
		
		
		var $results = $('.search-term'),
			regex = new RegExp(searchPhrase, "i"),
			returnedJSON = [],
			returnedNote = [],
			returnedTrades = [],
			returnedTradeSummary = [],
			requestURL = 'json.php',
			searchPhrase = $('#filter').val();
		
		 // Collect Data
		 
		 $results.html('<td class="data-cell">' + searchPhrase + '</td>');
		 
		 $.getJSON(requestURL, function (data) {
			  	console.log(data);
				
				if (data && data.length > 0 ) {
					
					var array = data;
					
					// Loop through the main data 
					$.each(array, function(index, field) {
						
						
						if ((field.party.search(regex) !== -1) ||
						(field.description.search(regex) !== -1) ||
						(field.priority.search(regex) !== -1) ||
						(field.age.search(regex) !== -1) ||
						(field.quantity.search(regex) !== -1) ||
						(field.diff_quantity.search(regex) !== -1) ||
						(field.item_value.search(regex) !== -1) ||
						(field.break_value.search(regex) !== -1) ||
						(field.diff_value.search(regex) !== -1) ||
						(field.diff_billing.search(regex) !== -1) ||
						(field.ccy.search(regex) !== -1) ||
						(field.broken_fields.search(regex) !== -1) ||
						(field.assigned.search(regex) !== -1) ||
						(field.items.search(regex) !== -1) ||
						(field.breaks.search(regex) !== -1)) {
						
						returnedJSON.push('<tr class="data-row">');
						//returnedJSON.push('<td class="data-cell">' + field.party + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.description + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.priority + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.age + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.quantity + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.diff_quantity + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.item_value + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.break_value + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.diff_value + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.diff_billing + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.ccy + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.broken_fields + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.assigned + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.items + '</td>');
						returnedJSON.push('<td class="data-cell">' + field.breaks + '</td>');
						returnedJSON.push('</tr>');
						
						// Notes
						var notes = field.notes;
						
						if (notes === undefined) {
							returnedNote.push('<td class="data-cell"> No Current Notes</td>');
						} else {
							returnedNote.push('<td class="data-cell">' + notes + '</td>');
						}
						
						// Trade Summary 
						var tradeSummary = field.trade_summary;
						
						if(typeof data === 'object' && tradeSummary){
						  $.each(tradeSummary, function(index, trading){
							  //console.log(index, trading);
							  returnedTradeSummary.push('<tr class="data-row">');
							  returnedTradeSummary.push('<td class="data-cell"> Trade Summary</td>');
							  
							  
							  if (index === 'settled_billing_value') {
								returnedTradeSummary.push('<td class="data-cell"> Settled Billing Value</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
							  }
							  if (index === 'settled_cash') {
								returnedTradeSummary.push('<td class="data-cell"> Settled Cash</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
							  }
							  if (index === 'settled_quantity') {
								returnedTradeSummary.push('<td class="data-cell"> Settled Quantity</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
							  }
							  $.each(trading, function(index, settledDetail){
								  //console.log(index, settledDetail);
								  returnedTradeSummary.push('<tr class="data-row">');
								  if (index === 'trade_ccy') {
								  	returnedTradeSummary.push('<td class="data-cell"> Trade CCY</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
								  }
								  if (index === 'base_ccy') {
								  	returnedTradeSummary.push('<td class="data-cell"> Base CCY</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
								  }
								  
								  returnedTradeSummary.push('</tr>');
								  $.each(settledDetail, function(index, tradeValue){
								  //console.log(index, tradeValue);
									returnedTradeSummary.push('<tr class="data-row">');
									
									if (index === 'ALPHA') {
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									  returnedTradeSummary.push('<td class="data-cell"> ALPHA: ' + tradeValue + '</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									}
									if (index === 'BETA') {
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									  returnedTradeSummary.push('<td class="data-cell"> BETA: ' + tradeValue + '</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									}
									if (index === 'ccy') {
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									  returnedTradeSummary.push('<td class="data-cell"> CCY: ' + tradeValue + '</td>');
									  returnedTradeSummary.push('<td class="data-cell">&nbsp</td>');
									}
									
								  });
							  });
							  returnedTradeSummary.push('</tr>');
						  });
						  
						}
						
						// Trades
						var tradeDetail = field.trades;
						
						if(typeof data === 'object' && tradeDetail){
						  $.each(tradeDetail, function(index, trade){
						   // console.log(index, trade);
							  returnedTrades.push('<tr class="data-row">');
							  
							  $.each(trade, function(index, source){
								 // console.log(index, source);
									returnedTrades.push('<tr class="data-row">');
								  
								  $.each(source, function(index, value){
								 // console.log(index, value);
									
									if (index === 'source') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'trade') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'sec_code') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'trans') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'settled_quantity') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'price') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'billing_value') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'ccy') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'settled_cash') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'diff_cash') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'fee_rate') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'rebate_rate') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
									
									if (index === 'dividend_rate') {
									  returnedTrades.push('<td class="data-cell">' + value + '</td>');
									}
								  });
								  
								  returnedTrades.push('</td>'); 
							  });
								  
							  returnedTrades.push('</td>'); 
						  });
						  
						}
						
						returnedJSON.push('</td>');
						}
					});
				
				}
					$('#data-results').html(returnedJSON.join(''));
					$('#item-trade-summary').html(returnedTradeSummary.join(''));
					$('#items-detail-notes').html(returnedNote.join(''));
					$('.trade-summary-results').html(returnedTrades.join(''));
			  });
		   
					
					
	});
	
	// Clear search
	
	$('.clear_filter').on('click', function(){
		$('#filter').val('');
	});
	
	//  Toggle header button UI
	$('.navbar-brand').on('click', function() {
		$('.main').toggleClass('col-sm-offset-3 col-md-offset-2 col-md-12');
		$('.sidebar').toggle('display');
	});
	
	// Paginate table
    $('#data-table').DataTable();
	
	$('#data-table_wrapper').addClass('col-sm-9 col-md-12');
	$('#data-table_filter').addClass('col-sm-6 right');
	$('#data-table_filter input').addClass('form-control right');
	$('#data-table_length').addClass('col-sm-6 left');
	$('#data-table_length select').addClass('form-control');
	$('#data-table_paginate').addClass('hidden');
	
	
	
	
	//end doc ready
});