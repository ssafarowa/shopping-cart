var sum = function (acc, x) {
	return acc + x;
};

var calcPrice = function () {
	var total = [];
	$("tbody tr").each(function (i, el) {
		var price = parseFloat($(el).find(".price input").val());
		var qty = parseFloat($(el).find(".qty input").val());
		var subTotal = qty * price;
		$(el).children(".subtotal").html(subTotal);
		total.push(subTotal);
		var totalAmount = total.reduce(sum);
		$("span").html(totalAmount);
	});
};

$(document).ready(function () {
	calcPrice();
	$(document).on("click", ".btn.remove", function (e) {
		$(this).closest("tr").remove();
		calcPrice();
	});
	var timeout;
	$(document).on("input", "tr input", function (e) {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			calcPrice();
		}, 1000);
	});
	$("#addItem").on("submit", function (e) {
		e.preventDefault();
		var Item = $(this).children("[name=Item]").val();
		var Price = $(this).children("[name=Price]").val();
		var Qty = $(this).children("[name=Qty]").val();
		var subT = Price * Qty;
		$("tbody").append(
			"<tr>" +
				'<td class="item">' +
				Item +
				"</td>" +
				'<td class="price"><input type="number" value="' +
				Price +
				'"/></td>' +
				'<td class="qty"><input type="number" value="' +
				Qty +
				'"/></td>' +
				'<td class="subtotal">' +
				subT +
				"</td>" +
				'<td><button class="btn btn-blue btn-sm remove">Remove</button></td>' +
				"</tr>"
		);
		calcPrice();
		$(this).children("[name=Item]").val("");
		$(this).children("[name=Price]").val("");
		$(this).children("[name=Qty]").val("");
	});
});
