/**************************************************************************************************
 * REGEX MATCHING
 * 
 * For each one of the sets, 

* CORE FUNCTIONALITY

When a regex collector is run, the name of the item will be tested via the Regex
If a match is recorded, the collector's function should fire to record the following information:

- Class Name
- Loot Tier
- Loot Icon

* USING SET NAMES

Set names provide us unique sets of gear that we can create a manual list from
that we can run the regex counters to build a data set to display on the front end


Set Name Examples:
Nemesis = Warlock Tier 2
Transcendance = Priest Tier 2
Might = Warrior Tier 1


data = n
regexs = m
Big O = n * m
Realistic = ~400 * 50
**************************************************************************************************/

interface RegexCollector {
  regex: RegExp;
  collector: Function;
}

interface LootSet {
  name: string;
  class_name: string;
  class_id: number;
}
