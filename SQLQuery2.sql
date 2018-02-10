
select 
ISNULL('{"name": "'+a.name+'","setName": "Snowquill Set","imagePath": "'+a.imagePath+'","obtained": false,"isUpgradable": '+Case Convert(varchar,a.isUpgradable) when 1 then 'true' else 'false' end+',"currentLevel": 0,"listOfUpgradeMaterials": ['+
substring(
        (
            Select 
			
			CASE WHEN COUNT(m1.name) > 0 THEN 
			' {"name": "'+m1.name+'","quantity": '+CONVERT(VARCHAR,m1.quantity)+',"forLevel":'+CONVERT(VARCHAR,m1.forLevel)+'},' -- AS [text()]
            ELSE '' END 
			From dbo.Material M1
            Where M1.armorId = a.id
			group by m1.name, m1.quantity, m1.forLevel
           -- ORDER BY m1.forLevel, M1.name
            For XML PATH ('')
        )
		, 2, 1000) 
		+ ']},' ,'{"name": "'+a.name+'","setName": "Snowquill Set","imagePath": "'+a.imagePath+'","obtained": false,"isUpgradable": false,"currentLevel": 0,"listOfUpgradeMaterials": []}') from Armor a
