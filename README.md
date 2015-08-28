# com-get-integrated-scatterchart
Qlik Sense Scatterplot with Customizable Popups

This sample is based off the [Qlik Sense Extension with D3 tutorial](http://blog.axc.net/tutorial-how-to-build-a-qlik-sense-extension-with-d3/). 

I've added a Tooltip section that allows the user to specify up to four items of information that will be used in a popup that appears when the mouse is moved over a data point.  The information can include additional dimensions or measures from the data model.  What the extension does is creates a second hypercube on the fly based on the original that the user created but adding on the information the user has specified for the popup and then creates the graph using that second hypercube.

The examples below use the Executive Dashboard sample app provided with Qlik Sense.  The full information provided to create the lines in the custom popup are:

<b>Line 1:</b> '&lt;b&gt;Account:&lt;/b&gt; ' &amp; Text(Account) &amp; ' - ' &amp; AccountDesc

<b>Line 2:</b> '&lt;b&gt;Account Group:&lt;/b&gt; ' &amp; Text(AccountGroup) &amp; ' - ' &amp; AccountGroupDesc

<b>Line 3:</b> '&lt;b&gt;Actual Expenses:&lt;/b&gt; ' &amp; Money(Sum(ExpenseActual))

<b>Line 4:</b> '&lt;b&gt;Budgeted Expenses:&lt;/b&gt; ' &amp; Money(SUM(ExpenseBudget))


![](https://github.com/bruce-armstrong/com-get-integrated-scatterchart/blob/master/tooltip_panel.PNG)

![](https://github.com/bruce-armstrong/com-get-integrated-scatterchart/blob/master/custom_tooltip.PNG)

