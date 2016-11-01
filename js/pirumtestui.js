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
		 
		 $results.html('<div class="data-cell">' + searchPhrase + '</div>');
		 
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
						
						returnedJSON.push('<div class="data-row">');
						//returnedJSON.push('<div class="data-cell">' + field.party + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.description + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.priority + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.age + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.quantity + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.diff_quantity + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.item_value + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.break_value + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.diff_value + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.diff_billing + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.ccy + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.broken_fields + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.assigned + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.items + '</div>');
						returnedJSON.push('<div class="data-cell">' + field.breaks + '</div>');
						
						// Notes
						var notes = field.notes;
						
						if (notes === undefined) {
							returnedNote.push('<div class="data-cell"> No Current Notes</div>');
						} else {
							returnedNote.push('<div class="data-cell">' + notes + '</div>');
						}
						
						// Trade Summary 
						var tradeSummary = field.trade_summary;
						
						if(typeof data === 'object' && tradeSummary){
						  $.each(tradeSummary, function(index, trading){
							  //console.log(index, trading);
							  returnedTradeSummary.push('<div class="data-header">');
							  returnedTradeSummary.push('<div class="data-row">');
							  returnedTradeSummary.push('<div class="data-cell"> Trade Summary</div>');
							  returnedTradeSummary.push('</div>');
							  returnedTradeSummary.push('</div>');
							  returnedTradeSummary.push('<div class="data-row">');
							  if (index === 'settled_billing_value') {
								returnedTradeSummary.push('<div class="data-cell"> Settled Billing Value</div>');
							  }
							  if (index === 'settled_cash') {
								returnedTradeSummary.push('<div class="data-cell"> Settled Cash</div>');
							  }
							  if (index === 'settled_quantity') {
								returnedTradeSummary.push('<div class="data-cell"> Settled Quantity</div>');
							  }
							  
							  $.each(trading, function(index, settledDetail){
								  //console.log(index, settledDetail);
								  returnedTradeSummary.push('<div class="data-row">');
								  if (index === 'trade_ccy') {
								  	returnedTradeSummary.push('<div class="data-cell"> Trade CCY</div>');
								  }
								  if (index === 'base_ccy') {
								  	returnedTradeSummary.push('<div class="data-cell"> Base CCY</div>');
								  }
								  
								  $.each(settledDetail, function(index, tradeValue){
								  //console.log(index, tradeValue);
									returnedTradeSummary.push('<div class="data-row">');
									
									if (index === 'ALPHA') {
									  returnedTradeSummary.push('<div class="data-cell"> ALPHA: ' + tradeValue + '</div>');
									}
									if (index === 'BETA') {
									  returnedTradeSummary.push('<div class="data-cell"> BETA: ' + tradeValue + '</div>');
									}
									if (index === 'ccy') {
									  returnedTradeSummary.push('<div class="data-cell"> CCY: ' + tradeValue + '</div>');
									}
									
									returnedTradeSummary.push('</div>'); 
								  });
								  returnedTradeSummary.push('</div>');
							  });
							  returnedTradeSummary.push('</div>');
						  });
						  
						}
						
						// Trades
						var tradeDetail = field.trades;
						
						if(typeof data === 'object' && tradeDetail){
						  $.each(tradeDetail, function(index, trade){
						   // console.log(index, trade);
							  returnedTrades.push('<div class="data-row">');
							  
							  $.each(trade, function(index, source){
								 // console.log(index, source);
									returnedTrades.push('<div class="data-row">');
								  
								  $.each(source, function(index, value){
								 // console.log(index, value);
									
									if (index === 'source') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'trade') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'sec_code') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'trans') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'settled_quantity') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'price') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'billing_value') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'ccy') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'settled_cash') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'diff_cash') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'fee_rate') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'rebate_rate') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
									
									if (index === 'dividend_rate') {
									  returnedTrades.push('<div class="data-cell">' + value + '</div>');
									}
								  });
								  
								  returnedTrades.push('</div>'); 
							  });
								  
							  returnedTrades.push('</div>'); 
						  });
						  
						}
						
						returnedJSON.push('</div>');
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
	
	
	//end doc ready
});