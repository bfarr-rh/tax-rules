Tax Rules Example
=======================

This project provides an example of mapping a ruleflow in DMN in the context of Tax rules. 

![Alt text](ui/images/TaxRules.png?raw=true "Tax Rule")

It provides a basic UI form to drive and invoke the call to the Rule, this will require CORS to be setup if run outside. The UI can be loaded locally in a browser under "ui/index.html".

![Alt text](ui/images/ui1.png?raw=true "Invoke the Tax Rule")

The UI provides options for the container id and username/password to invoke the kie server and thus can easily demonstrate how multiple versions can be used.

![Alt text](ui/images/ui2.png?raw=true "Settings")

DMN Modelling
=============
This project also demonstrates 
1. How to setup a DMN model which can be reused and imported.
2. How to map a traditional Data Object into a DMN Data structure within entry/exit scripts within the ruleflow.
