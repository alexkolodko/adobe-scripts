# Adobe Scripts

[![Telegram](https://img.shields.io/badge/Telegram%20Channel-%40alexkolodko1-0088cc)](https://t.me/alexkolodko1)

## Donate

Scripts are free to use, but if you want to support the development of these scripts, you can donate:

- [Monobank](https://send.monobank.ua/5jVrTaRziu)
- [Base by Mono](https://base.monobank.ua/EDCkFUWg3Tp64e)
- [Buymeacoffee](https://www.buymeacoffee.com/alexkolodko)
- [Donatello](https://donatello.to/alexkolodko)


<a href="https://www.buymeacoffee.com/alexkolodko" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;" ></a>





# Adobe Illustrator

### Color Proof Maker

This script generates color variations in CMYK for a selected object, creating a color palette with multiple swatches. It calculates different color variations for cyan, magenta, yellow, and black components of the selected object.


Options in the script:
* `STEP` — color step;
* `QV` — range of color;
* `QT` - number of variants 

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Color%20Proof%20Maker.jsx)

![Color Proof Maker](/docs/i/color-proof-maker.gif)



### Export All Artboards as AI

Export all artboards as separate AI files. Usage: select the folder where you want to save files.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Export%20All%20Artboards%20as%20AI.jsx)


### Export Artboards as AI

Extended version of the script. Usage: Select Artboard select the folder where you want to save the file and select which artboards you want to export: all, only active or choose a few.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Export%20Artboards%20as%20AI.jsx)


### Font Distance Readability

This script calculates and displays the readability of a selected text frame based on the font size, cap height, x-height, and reading distance. Then it can paste the result as text in the text frame.

It is designed to assist designers and typographers in understanding the readability of their text at various distances.

Clarification: The script uses fixed font proportion values — Cap height = 0.7 and x-height = 0.5 of the font size. And the distance is calculated from Cap height: 3.4 mm per meter of distance.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Font%20Distance%20Readability.jsx)

![Font Distance Readability](/docs/i/font-distance-readability.gif)

### Numbering objects

This script prompts the user to input a starting number and choose the numeration direction (top to bottom or left to right). It then sorts the selected objects and creates text labels above each object starting from the specified number.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Numbering%20objects.jsx)

![Numbering objects](/docs/i/numbering-objects.gif)


### Scale Objects

This script simplifies scaling selected objects in custom proportions. You can input current and future sizes, and the script scales the objects while preserving their positions.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Scale%20Objects.jsx)


### Size of object as text

This script displays the size of the selected object as text in the text frame above the object.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Size%20of%20object%20as%20text.jsx)


### Square as text

This script displays the size of the selected square as text in the text frame above the shape.

[Download](https://raw.githubusercontent.com/alexkolodko/adobe-scripts/main/AI/Square%20as%20text.jsx)


### Square difference 2 objects

This script calculates and displays the area difference between two selected objects (area and bounding box) showing the absolute and percentage differences. It also includes the option to paste the results as text.

[Download]()





<!-- ### Транслітерація тексту 

 A3КМУ 2010
Скрипт для транслітерації топонімів зоснований на [онлайновому транслітераторі](http://translit.a3.kyiv.ua). Постійно копіювати текст з браузера незручно, то чому б не перенести транслітератор безпосередньо у Ілюстратор та Індизайн.

[![Скрипт для транслітерації в Adobe Illustrator](http://img.youtube.com/vi/0NphpSzBg2Q/0.jpg)](http://www.youtube.com/watch?v=0NphpSzBg2Q "Скрипт для транслітерації в Adobe Illustrator")

Як працює: обираєте текст, запускаєте скрипт. Працює з точковим текстом, текстовими фреймами, текстом на кривих.

[Завантажити](https://raw.githubusercontent.com/agentyzmin/a3-tools/master/a3_translit/scripts/A3%20Translit%20(AI).jsx)



### Транслітератор 

За тим же принципом тільки з використанням офіційної транслітерації українського алфавіту латиницею затвердженої [постановою](https://zakon.rada.gov.ua/laws/show/55-2010-%D0%BF) Кабінету Міністрів України №55 від 27 січня 2010 р.

[Завантажити](https://raw.githubusercontent.com/agentyzmin/a3-tools/master/a3_translit/scripts/Translit%20KMU%202010%20(AI).jsx)





## Adobe InDesign

### Транслітератор А3

Те ж саме як в Adobe Illustrator. Як працює: обираєте текстовий фрейм, запускаєте скрипт.

[![Скрипт для транслітерації в Adobe InDesign](http://img.youtube.com/vi/8m3ksfNvGlg/0.jpg)](http://www.youtube.com/watch?v=8m3ksfNvGlg "Скрипт для транслітерації в Adobe InDesign")

[Завантажити](https://raw.githubusercontent.com/agentyzmin/a3-tools/master/a3_translit/scripts/A3%20Translit%20(ID).jsx)


### Транслітератор КМУ 2010

Те ж саме як в Adobe Illustrator. Як працює: обираєте текстовий фрейм, запускаєте скрипт.

[Завантажити](https://raw.githubusercontent.com/agentyzmin/a3-tools/master/a3_translit/scripts/Translit%20KMU%202010%20(ID).jsx)


 -->





# How to install scripts

## Adobe Illustrator

Save the .jsx script to the scripts folder:

* Mac OS: `Applications\Adobe Illustrator 2024\Presets\en_GB\Scripts`
* Windows: `C:\Program Files\Adobe\Adobe Illustrator 2020\Presets\en_US\Scripts`

`2024` — version of the installed program, `en_GB` — code of the installed language.

To make the installed script appear in the menu, you need to restart the program.

## Adobe InDesign

Open the script panel `Window > Utilities > Scripts`, then click the right mouse button on the folders *Application* or *User*. It is better to use the User folder for your scripts (the Application folder will make the scripts accessible for all users on this computer, but for this, you will need administrator rights). To open the folder, in the context menu select `Reveal in Finder` (or `Reveal` for Windows).

# How to run scripts

There are two main ways to run a script ([Adobe Help](https://helpx.adobe.com/ua/illustrator/using/automation-scripts.html)):
1. Select Menu/Scripts (File > Scripts), then select the script.
2. To run the script, drag and drop the JSX file into the program. However, this is not recommended and unsafe. A dialog window will appear to prevent unintended actions.

Perform the following steps to hide the dialog window and run the script.

1. Create a JSX file with the following content: `app.` `preferences``.`setBooleanPreference("ShowExternalJSXWarning", false)`
1. Save the JSX file.
1. Go to Menu/File > Scripts > Other Scripts and select the recently saved JSX file.

## Useful plugins

[JSX Launcher](https://adobe.com/go/cc_plugins_discover_plugin?pluginId=12096&workflow=share) — quick run scripts from the folder with buttons.

[Screepshon Trees](https://adobe.com/go/cc_plugins_discover_plugin?pluginId=15873&workflow=share) — access to the folder with scripts from the panel.
