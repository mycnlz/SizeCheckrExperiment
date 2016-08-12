describe("SizeCheckr Plugin", function(){

	var settings = new CustomerBuilder.newOne();
	var urlShop = "shop/index.html";
	var url = '';
	var spyEvent;

	beforeEach(function(){
		loadFixtures(urlShop);
	});

    describe("Partner side", function(){

		var partnerSizes;
		var gDataAttribute = "plugingenre";
		var sDataAttribute = "pluginsize";
		var gElem = "[data-" + gDataAttribute + "=" + settings.g + "]";
		var sElem = "[data-" + sDataAttribute + "=" + settings.s + "]";
		var gList = "[data-" + gDataAttribute + "]";
		var sList = "[data-" + sDataAttribute + "]";

		beforeEach(function(){
			$(gElem).on('click', function(e){
				$(gList).removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});
			$(sElem).on('click', function(e){
				$(sList).removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});
			var getGenreSelected = function(){
				var size = "M";
				$(gList).each(function(){
					if($(this).hasClass('active')){
						size = $(this).data('plugingenre');
					}
				});
				return size;
			};
			var getSizeSelected = function(){
				var size = "S";
				partnerSizes = [];
				$(sList).each(function(){
					partnerSizes.push($(this).data('pluginsize'));
					if($(this).hasClass('active')){
						size = $(this).data('pluginsize');
					}
				});
				return size;
			};
			var urlBase = 'sizecheckr/server/';
			$('#pluginButton').on('click', function(e){
				var xSize = getSizeSelected();
				var xGenre = getGenreSelected();
				var xProdu = ($(this).data('product')) ? $(this).data('product') : 'ROUPA QUALQUER';
				url = urlBase + 'sizecheckr.html?g=' + xGenre + '&p=' + xProdu + '&s=' + xSize + '&t=' + partnerSizes;
				$('#pluginFrame').attr('src', url);
				e.preventDefault();
			});
		});

		describe("Elementos de página necessários", function(){
			describe("[data-plugingenre]", function(){
		        it("● deve existir um atributo 'data-plugingenre' no menu da loja para passar o gênero", function(){
		    		expect($(gList)).toBeInDOM();
		    	});

		        it("● o menu de gênero da loja deve registrar a classe ou atributo 'active' quando selecionado", function(){
					spyEvent = spyOnEvent($(gElem), 'click');
					$(gElem).trigger('click');
					expect('click').toHaveBeenTriggeredOn($(gElem));
					expect(spyEvent).toHaveBeenTriggered();
					expect($(gElem).hasClass('active')).toBeTruthy();
		    	});
			});

			describe("[data-pluginsize]", function(){
		        it("● deve existir um atributo 'data-pluginsize' vinculado a lista de tamanhos disponíveis para o produto", function(){
		    		expect($(sList)).toBeInDOM();
		    	});

		        it("● a lista de tamanhos disponíveis deve registrar a classe ou atributo 'active' no tamanho selecionado", function(){
					spyEvent = spyOnEvent($(sElem), 'click');
					$(sElem).trigger('click');
					expect('click').toHaveBeenTriggeredOn($(sElem));
					expect(spyEvent).toHaveBeenTriggered();
					expect($(sElem).hasClass('active')).toBeTruthy();
		    	});
			});

			describe("pluginButton", function(){
		        it("● deve existir um botão com id='pluginButton'", function(){
		    		expect($('#pluginButton')).toBeInDOM();
		    	});

		        it("● o 'pluginButton' deve conter a classe 'pluginButton'", function(){
		    		expect($('#pluginButton').hasClass('pluginButton')).toBeTruthy();
		    	});

		        it("● o 'pluginButton' deve conter o atributo 'data-product'", function(){
		    		expect($('#pluginButton')).toHaveAttr('data-product');
		    	});
			});

			describe("div#pluginLightbox > iframe#pluginFrame + div#pluginClose", function(){
		        it("● deve existir uma div com id='pluginLightbox'", function(){
		    		expect($('div#pluginLightbox')).toBeInDOM();
		    	});

		        it("● a div 'pluginLightbox' deve conter um elemento iframe com id='pluginFrame'", function(){
		    		expect($('div#pluginLightbox')).toContainElement('iframe#pluginFrame');
		    	});

		        it("● a div 'pluginLightbox' deve conter uma div com id='pluginClose'", function(){
		    		expect($('div#pluginLightbox')).toContainElement('div#pluginClose');
		    	});
			});
		});

		describe("Acessando o SizeCheckr", function(){
            it("● o plugin deve passar um gênero padrão se nenhum gênero for registrado", function(){

                $("[data-plugingenre]").removeClass('active');
                var checkActiveGenre = function(){
    				var achei = false;
    				$("[data-plugingenre]").each(function(){
                        if($(this).hasClass('active')){
    						achei = true;
                            return false;
    					}
    				});
    				return achei;
    			};
                var getGenreSelected = function(){
    				var size = "M";
    				$("[data-plugingenre]").each(function(){
                        if($(this).hasClass('active')){
    						size = $(this).data('plugingenre');
    					}
    				});
    				return size;
    			};
                expect((checkActiveGenre() === false && getGenreSelected() === "M")).toBeTruthy();
	    	});
            it("● o plugin deve passar um tamanho padrão se nenhum tamanho for registrado", function(){

                $("[data-pluginsize]").removeClass('active');
                var checkActiveSize = function(){
    				var achei = false;
    				$("[data-pluginsize]").each(function(){
                        if($(this).hasClass('active')){
    						achei = true;
                            return false;
    					}
    				});
    				return achei;
    			};
                var partnerSizes = [];
                var getSizeSelected = function(){
    				var size = "S";
    				$("[data-pluginsize]").each(function(){
    					partnerSizes.push($(this).data('pluginsize'));
    					if($(this).hasClass('active')){
    						size = $(this).data('pluginsize');
    					}
    				});
    				return size;
    			};
                expect((checkActiveSize() === false && partnerSizes.length === 0 && getSizeSelected() === "S")).toBeTruthy();
	    	});
            it("● o plugin deve passar um tipo de produto padrão se nenhum tipo de produto for registrado", function(){

                $('#pluginButton').data('product', "");
                var vButton = $('#pluginButton').data('product');
                var vTreated = ($('#pluginButton').data('product')) ? $('#pluginButton').data('product') : 'ROUPA QUALQUER';
                expect((vButton === "" && vTreated === "ROUPA QUALQUER")).toBeTruthy();
	    	});
			it("● o plugin deve gerar uma url válida para o iframe #pluginFrame", function(){
				spyEvent = spyOnEvent($('#pluginButton'), 'click');
				$('#pluginButton').trigger('click');
				expect('click').toHaveBeenTriggeredOn($('#pluginButton'));
				expect(spyEvent).toHaveBeenTriggered();
				expect($('#pluginFrame').attr('src')).toContain('sizecheckr/server/sizecheckr.html?g=');
	    	});
		});
    });

	var objSettings;

    describe("SizeCheckr side", function(){
	    describe("Inicializando o SizeCheckr", function(){

			beforeEach(function(){
                objSettings = $.url('?', encodeURI(url));
			});

		    describe("Definição do objeto settings", function(){
				it("● deve receber uma url válida para criar o objeto settings", function(){
		    		expect($.isEmptyObject(objSettings)).toBeFalsy();
		    	});
		    	it("● deve ter um gênero", function(){
		    		expect(objSettings.hasOwnProperty("g")).toBeTruthy();
		    	});
		        it("● deve ter um tamanho", function(){
		    		expect(objSettings.hasOwnProperty("s")).toBeTruthy();
		    	});
		        it("● deve ter um produto vindo da loja", function(){
		    		expect(objSettings.hasOwnProperty("p")).toBeTruthy();
		    	});
		    });
		});

	    describe("Saindo do SizeCheckr", function(){
			it("● a div 'pluginLightbox' deve conter uma div com id='pluginClose'", function(){
	    		expect($('div#pluginLightbox')).toContainElement('div#pluginClose');
	    	});
	    });
	});
});
