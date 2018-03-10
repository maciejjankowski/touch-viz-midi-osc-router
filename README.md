# touch-viz-midi-osc-router
 converts MIDI CC into corresponding OSC and sends it to TouchViz app

basically turns [this](https://hexler.net/docs/touchviz-midi-reference) into [this](https://hexler.net/docs/touchviz-osc-reference) and sends those messages to listening ipad


TODO
* [ ] add spectrum analyzer -> MIDI CC http://w2017.pl/napisze-program-wysylajacy-komunikaty-midiosc-na-podstawie-analizy-dzwieku/
* [ ] "macros" = more logic in bundles of OSC msgs (change effect -> xfade -> change clip -> add fx -> change params)
* [ ] add paging of controller layouts with dedicated buttons
* [ ] plug and play: 
  * [ ] hostapd
  * [ ] bonjour
