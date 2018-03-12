update armor
set imagePath ='/images/BotW '+armor.name+' Icon.png.png'


select 
ISNULL('{"name": "'+a.name+'","setName": "Snowquill Set","imagePath": "'+a.imagePath+'","obtained": false,"isUpgradable": false,"currentLevel": 0,"listOfUpgradeMaterials": ['+
substring(
        (
            Select 
			
			CASE WHEN COUNT(m1.name) > 0 THEN 
			' {"name": "'+m1.name+'","quantity ": '+CONVERT(VARCHAR,m1.quantity)+',"forLevel":'+CONVERT(VARCHAR,m1.forLevel)+'},' -- AS [text()]
            ELSE '' END 
			From dbo.Material M1
            Where M1.armorId = a.id
			group by m1.name, m1.quantity, m1.forLevel
           -- ORDER BY m1.forLevel, M1.name
            For XML PATH ('')
        )
		, 2, 1000) 
		+ ']},' ,'{"name": "'+a.name+'","setName": "Snowquill Set","imagePath": "'+a.imagePath+'","obtained": false,"isUpgradable": false,"currentLevel": 0,"listOfUpgradeMaterials": []}') from Armor a


select  
'{"name": "'+a.name+'",', 
(SELECT COALESCE(@Names + ', ', '') + Name 
FROM Material)
from Armor a
inner join Material m on m.armorId = a.Id


select 
'{"name": "'+a.name+'",
    "setName": "Snowquill Set",
    "imagePath": "/images/BotW Snowquill Headdress Icon.png.png",
    "obtained": false,
    "isUpgradable": false,
    "currentLevel": 0,
    "listOfUpgradeMaterials": [
      {
        "name": "Red Chuchu Jelly",
        "quantity": 3,
        "forLevel": 1
      },
      {
        "name": "Red Chuchu Jelly",
        "quantity": 5,
        "forLevel": 2
      },
      {
        "name": "Warm Safflina",
        "quantity": 3,
        "forLevel": 2
      },
      {
        "name": "Fire Keese Wing",
        "quantity": 8,
        "forLevel": 3
      },
      {
        "name": "Sunshroom",
        "quantity": 5,
        "forLevel": 3
      },
      {
        "name": "Red Lizalfos Tail",
        "quantity": 10,
        "forLevel": 4
      },
      {
        "name": "Ruby",
        "quantity": 5,
        "forLevel": 4
      }
    ]
  },'

from Armor a
inner join Material m on m.armorId = a.Id

 --{
 --   "name": "Snowquill Headdress",
 --   "setName": "Snowquill Set",
 --   "imagePath": "/images/BotW Snowquill Headdress Icon.png.png",
 --   "obtained": false,
 --   "isUpgradable": false,
 --   "currentLevel": 0,
 --   "listOfUpgradeMaterials": [
 --     {
 --       "name": "Red Chuchu Jelly",
 --       "quantity": 3,
 --       "forLevel": 1
 --     },
 --     {
 --       "name": "Red Chuchu Jelly",
 --       "quantity": 5,
 --       "forLevel": 2
 --     },
 --     {
 --       "name": "Warm Safflina",
 --       "quantity": 3,
 --       "forLevel": 2
 --     },
 --     {
 --       "name": "Fire Keese Wing",
 --       "quantity": 8,
 --       "forLevel": 3
 --     },
 --     {
 --       "name": "Sunshroom",
 --       "quantity": 5,
 --       "forLevel": 3
 --     },
 --     {
 --       "name": "Red Lizalfos Tail",
 --       "quantity": 10,
 --       "forLevel": 4
 --     },
 --     {
 --       "name": "Ruby",
 --       "quantity": 5,
 --       "forLevel": 4
 --     }
 --   ]
 -- },