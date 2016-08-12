var CustomerBuilder = (function(){

	var g = 'M';
	var p = 'BOTTOMS';
	var s = 'XL';
    var t = "XS,S,M,L,XL,XXL";

	var build = function(genre, product, size, partnerSizes){
        return {
            g: g,
            p: p,
            s: s,
            t: t
		};
	};

	return {
        newOne : build
    }
})();
