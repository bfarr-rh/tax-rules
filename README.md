Knockout Rules Example
=======================

This project provides an example of mapping a ruleflow in DMN in the context of Land Tax rules. 

![Alt text](ui/images/KnockOutRules.bpmn.jpg?raw=true "Knockout Rule")

It provides a basic UI form to drive and invoke the call to the Rule, this will require CORS to be setup if run outside. The UI can be loaded locally in a browser under "ui/index.html".

The UI provides options for the container id and username/password to invoke the kie server and thus can easily demonstrate how multiple versions can be used.

![Alt text](ui/images/Snip20191009_1.png?raw=true "UI")
![Alt text](ui/images/Snip20191009_2.png?raw=true "UI")

DMN Modelling
=============
This project also demonstrates 
1. How to setup a DMN model which can be reused and imported.
2. How to map a traditional Data Object into a DMN Data structure within entry/exit scripts within the ruleflow.


