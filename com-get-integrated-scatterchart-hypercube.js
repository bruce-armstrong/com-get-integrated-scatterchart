var hyperCube = null;

function render($element, layout ) {
  
  if ( hyperCube ){
    var data ;
    
    // get qMatrix data array
    var qMatrix = hyperCube.qDataPages[0].qMatrix;
    
    // create a new array that contains the measure labels
    var measureLabels = hyperCube.qMeasureInfo.map(function (d) {
      return d.qFallbackTitle;
    });
    
    // Create a new array for our extension with a row for each row in the qMatrix
    // for each element in the matrix, create a new object that has a property
    // for the grouping dimension, the first metric, and the second metric
    if ( hyperCube.qDataPages[0].qArea.qWidth == 3){
      //If user hasn't defined a tooltip, use the Program Name
      data = qMatrix.map(function (d) {
        return {
          "Dim1": d[0].qText,
          "Metric1": d[1].qNum,
          "Metric2": d[2].qNum,
          "Tooltip": d[0].qText
        }
      });
    } else {
      //Otherwise, use the defined tooltip
      data = qMatrix.map(function (d) {
        return {
          "Dim1": d[0].qText,
          "Metric1": d[2].qNum,
          "Metric2": d[3].qNum,
          "Tooltip": d[1].qText
        }
      });
    }      
    // Chart object width
    var width = $element.width();
    
    // Chart object height
    var height = $element.height();
    
    // Chart object offset
    var offset = $element.offset();
    
    createchart(data, measureLabels, width, height, offset);
  }
}

function getTooltipDim (layout){
  var tooltipDim = "" ;
  if ( layout.props.tooltipText1 != "" ){
	tooltipDim = "=";
    tooltipDim = tooltipDim.concat ( layout.props.tooltipText1 );
    if ( layout.props.tooltipText2 != "" ){
      tooltipDim = tooltipDim.concat ( " & '<br />' & ");
      tooltipDim = tooltipDim.concat ( layout.props.tooltipText2 );
      if ( layout.props.tooltipText3 != "" ){
        tooltipDim = tooltipDim.concat ( " & '<br />' & ");
        tooltipDim = tooltipDim.concat ( layout.props.tooltipText3 );
        if ( layout.props.tooltipText4 != "" ){
          tooltipDim = tooltipDim.concat ( " & '<br />' & ");
          tooltipDim = tooltipDim.concat ( layout.props.tooltipText4 );
        }
      }
    }
  }
  return tooltipDim ;
}


function createHypercube($scope,$element,app) {

  //Get the hypercube defined by the user
  $scope.backendApi.getProperties().then(function(reply){  
    var cubeDef = $.extend(true,{},reply.qHyperCubeDef) ;
    if ( cubeDef.qDimensions.length == 1 ){
      var tooltipDim = getTooltipDim($scope.layout);
      if ( tooltipDim != "" ){
          //Create another cube that adds the tooltip data 
    	  cubeDef.qDimensions.push ({ qDef : { qFieldDefs : [ tooltipDim ] } });
    	  cubeDef.qInitialDataFetch[0].qWidth = 4 ;
          app.createCube(cubeDef, function (reply) {
              console.log('cube', reply);
              hyperCube = reply.qHyperCube;
              render($element, $scope.layout );
          });
      } else {
        //Use the original cube
        hyperCube = $scope.layout.qHyperCube;
        render($element, $scope.layout );
      }
    }
  });
}

function controllerHandler($scope, $element, app) {
  
  	// Recreate the cube when the user has modified the custom properties
    $scope.$watchCollection('layout.props', function (newVal) {
        createHypercube($scope, $element, app);
    });
  
  	createHypercube($scope, $element, app);
  
}
