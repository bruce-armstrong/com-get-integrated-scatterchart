# com-get-integrated-scatterchart
Qlik Sense Scatterplot with Customizable Popups

This sample is based off the [Qlik Sense Extension with D3 tutorial](http://blog.axc.net/tutorial-how-to-build-a-qlik-sense-extension-with-d3/). 

I've added a Tooltip section that allows the user to specify up to four items of information that will be used in a popup that appears when the mouse is moved over a datapoint.  The information can include additional dimensions or measures from the data model.  What the extension does is creates a second hypercube on the fly based on the original but adding on the information the user has specified for the toolip and then creates the graph using that second hypercube.

![](https://github.com/bruce-armstrong/com-get-integrated-scatterchart/blob/master/tooltip_panel.PNG)

![](https://github.com/bruce-armstrong/com-get-integrated-scatterchart/blob/master/custom_tooltip.PNG)

