Here is my test task solution.

I desided to add some reels blur while rotating and ammortizations before reels start and right after reels are stopped.
Paytable and testers panel are presented as UI-friendly blocks. All assets as so as UI-layout were prepared by myself.

As the code architecture I`ve choosen a tree based sheme. All display objects are presented as controllers of themselves calling public methods of their children and firing out events which are listened all around the code. Most of game settings are moved out from code and they are now situated at config/main_config.json file.

Thanks for watching!