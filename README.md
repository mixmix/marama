# Marama

![](./marama.jpg)

_From te reo maori: [marama](http://maoridictionary.co.nz/search?keywords=moon) - 1. moon, 2. month_ 

## Uasge

```js
var Marama = require('marama')
require('marama/lib/styles-inject')()

const marama = Marama({
  events: [
    { date: new Date(2018, 3, 4), data: { attending: false } },
    { date: new Date(2018, 7, 21), data: { attending: true } }
    // NOTE Date has signatute (Year, monthIndex, day)
  ],
  range: {
    gte: new Date(2018, 7, 13),
    lt: new Date(2018, 7, 20) // range of highlighted dates
  },
  styles: {
    tileRadius: 18,
    tileGap: 4
  }
})

document.body.appendChild(marama)
```


## API

Marama can take the following options:

```js
{
  month,   // month number (by common defn, e.g. 4 is April)
  events      // (optional) an Array of form: [{ date: Date, data: { ... } }]
  year,       // (optional) defaults to current year
  monthNames, // (optional) an Array of month names
  range,      // (optional) an Object of form { gte: Date, lt: Date } to highlight
  setRange,   // (optional) a callback which receives a range on clicks { gte, lt } 
  styles,     // (optional) Object, _see below_
  today       // (optional) a Date which can be used to over-ride the definition of today
}
```

The `styles` option can be used to change how Marama looks programmatically

```js
{
  tileRadius, // (optional) Number, half-width of a day-tile, in px (default 6)
  tileGap,    // (optional) Number, gap between day-tiles, in px (default: 1)
  dotRadius,  // (optional) Number, radius of the 'attendance' dot in px (default: tileRadius/2)
  dotBorder,  // (optional) Number, depth of outline on an event not attending (default: 1) 
  weekFormat, // (optional) String(rows|columns), which direction weeks run in (default: rows)
}
```
