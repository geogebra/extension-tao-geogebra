define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'taoQtiItem/qtiCreator/editor/containerEditor',
    'tpl!geogebra/creator/tpl/propertiesForm',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, containerEditor, formTpl, _, $){

    var GeoGebraStateQuestion = stateFactory.extend(Question, function(){

        var $container = this.widget.$container,
            $prompt = $container.find('.prompt'),
            interaction = this.widget.element;

        containerEditor.create($prompt, {
            change : function(text){
                interaction.data('prompt', text);
                interaction.updateMarkup();
            },
            markup : interaction.markup,
            markupSelector : '.prompt',
            related : interaction
        });

        simpleEditor.create($container, '.geogebra-width', function(text){
            interaction.prop('width', text);
        });

        simpleEditor.create($container, '.geogebra-height', function(text){
            interaction.prop('height', text);
        });

    }, function(){

        var $container = this.widget.$container,
            $prompt = $container.find('.prompt');

        simpleEditor.destroy($container);
        containerEditor.destroy($prompt);
    });

    GeoGebraStateQuestion.prototype.initForm = function(){

        var _widget = this.widget,
            $form = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration(),
            width = parseInt(interaction.prop('width')) || 600,
            height = parseInt(interaction.prop('height')) || 450;

        //build select option data for the template
       

        //render the form using the form template
        $form.html(formTpl({
            serial : response.serial,
            "width" : width,
            "height": height,
            identifier : interaction.attr('responseIdentifier')
        }));

        //init form javascript
        formElement.initWidget($form);

        //init data change callbacks
        formElement.setChangeCallbacks($form, interaction, {
            "width" : function(interaction, value){

                //update the pci property value:
                interaction.prop('width', value);
                
                //trigger change event:
                interaction.triggerPci('sizechange', [parseInt(value),-1]);
            },
            "height" : function(interaction, value){

                //update the pci property value:
                interaction.prop('height', value);
                
                //trigger change event:
                interaction.triggerPci('sizechange', [-1,parseInt(value)]);
            },
            
        });

    };

    return GeoGebraStateQuestion;
});
