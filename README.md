Business Problem
================

It is often the case that businesses have developed spreadsheet and macros which is requires manual and multiple levels of interaction. Automating these rules can be easily achieved with Red Hat Decision Manager but sometimes the design requires a level of control into how rules are applied.

Red Hat Decision Manager (DM) is at its best when used as an inference engine approach, however it also has levers that help with flow called ruleflows. RuleFlows within DM are represented in similar vein to BPMN diagrams but tasks will be rules. Since the DMN editor and engine has been brought into DM, DMN Rule tasks can now be used within these ruleflows.


Business Input
==============

3 Spreadsheet inputs have been mapped to form the knockout style rules. Knockout rules meaning only execute the logic thats needed before returning a result. 

Test 1 - Puchaser Type Test	
Purchaser Type	                                        Land Tax
Individual - Permanent Resident or Citizen	            Go to test 2
Individual - Foreign	                                  4%
Company	                                                5%

Test 2 - Transaction type	
Transaction Type	                                      Land Tax
Transfer between spouses, defacto or domestic partner	  0%
Principal Place of Residence	                          1%
Investment	                                            Go to Test 3

Test 3 - Purchase Price	
Price	                                                  Land Tax
<500,000	                                              2%
500,000+	                                              3%

Knockout Tax Rule Implementation
================================

Mapping a ruleflow with DMN.

![alt text](ui/images/TaxRules.png?raw=true "Tax Rule Flow")

It provides a basic UI form to drive and invoke the call to the Rule, this will require CORS to be setup if run outside. The UI can be loaded locally in a browser under "ui/index.html".

![alt text](ui/images/ui1.png?raw=true "UI")

The UI provides options for the container id and username/password to invoke the kie server and thus can easily demonstrate how multiple versions can be used.

![alt text](ui/images/ui2.png?raw=true "UI")

DMN Modelling
=============
This project also demonstrates 
1. How to setup a DMN model which can be reused and imported.
2. How to map a traditional Data Object into a DMN Data structure within entry/exit scripts within the ruleflow.


