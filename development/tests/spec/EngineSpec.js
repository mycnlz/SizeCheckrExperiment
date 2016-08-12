describe("SizeCheckr Engine", function(){

	var settings = new CustomerBuilder.newOne();
    console.log('CustomerBuilder.newOne()', settings);

	var url = '';
	var spyEvent;

	beforeEach(function(){
        url = 'sizecheckr/server/sizecheckr.html?g=' + settings.g + '&p=' + settings.p + '&s=' + settings.s + '&t=' + settings.t;
        loadFixtures(url);
        SizeCheckr.loadSettings(settings);
	});

    describe("SizeCheckr side", function(){
	    describe("Elementos de página necessários", function(){
            describe("Identificação da loja parceira", function(){
                it("● deve exibir identificação da loja parceira no cabeçalho", function(){
                    expect($('#partnerLogo')).toBeInDOM();
                });
		    });

		    describe("Tipo do produto", function(){
		        it("● deve exibir tipo do produto e gênero acima da silhueta", function(){
		    		expect($('.pluginProductType')).toBeInDOM();
		    	});
		    });

		    describe("Silhueta", function(){
		        it("● deve existir uma imagem SVG para inserir uma silhueta humana", function(){
                    expect($('.pluginSilhouette svg')).toBeInDOM();
		    	});

		        it("● deve exibir uma imagem SVG correspondente ao gênero passado", function(){

                    var imgM = "<g><g id='Man'></g></g>";
                    var imgF = "<g><g id='Woman'></g></g>";

                    var loadSVG = function(g){
                        switch(g){
                            case 'M': return imgM;
                            case 'F': return imgF;
                            case 'C': return imgM; // SVG not created yet :(
                        }
                    };

                    $('.pluginSilhouette svg').html(loadSVG(settings.g));
                    expect($('g#Man')).toBeInDOM();
		    	});
		    });

		    describe("Lista de tamanhos", function(){
		        it("● deve exibir a lista de tamanhos vinda da loja", function(){
		    		expect($('[data-tSize]')).toBeInDOM();
		    	});

                it("● o tamanho passado deve estar selecionado na lista de tamanho", function(){
                    var achei = false;
                    $('[data-tsize]').each(function(index){
                        if($(this).hasClass('active') && $(this).data('tsize') === settings.s){
                            achei = true;
                            return false;
                        }
                    });
		    		expect(achei).toBeTruthy();
		    	});
		    });

		    describe("Sliders para ajuste de tamanhos", function(){
                it("● devem existir sliders para ajuste de tamanhos", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● a quantidade de slider deve ser a mesma definida para o tipo de produto passado", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● deve existir uma legenda em cada slider", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● deve existir um cor diferente representada em cada slider", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● todos os sliders devem estar carregados com valores mínimos e máximos corretos", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● os valores do slider devem ser corretamente atualizados ao mudar sua posição", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● os valores do slider devem ser corretamente atualizados selecionar outro tamanho na lista de tamanhos", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
                it("● a respectiva tooltip deve ser exibida ao mudar a posição do slider", function(){
		    		expect($('input[type=range].pluginSlider')).toBeInDOM();
		    	});
		    });

		    describe("Outras interações gerais", function(){

		    });
		});
	});
});
