define([
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'geogebra/creator/widget/states/states'
], function(Widget, states){

    var GeoGebraExerciseWidget = Widget.clone();

    GeoGebraExerciseWidget.initCreator = function(){
        
        this.registerStates(states);
        
        Widget.initCreator.call(this);
    };
    
    return GeoGebraExerciseWidget;
});