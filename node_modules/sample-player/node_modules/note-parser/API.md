## Functions

<dl>
<dt><a href="#regex">regex()</a> ⇒ <code>RegExp</code></dt>
<dd><p>A regex for matching note strings in scientific notation.</p>
</dd>
<dt><a href="#parse">parse(note, isTonic, tunning)</a> ⇒ <code>Object</code></dt>
<dd><p>Parse a note name in scientific notation an return it&#39;s components,
and some numeric properties including midi number and frequency.</p>
</dd>
<dt><a href="#midiToFreq">midiToFreq(midi, tuning)</a> ⇒ <code>Float</code></dt>
<dd><p>Given a midi number, return its frequency</p>
</dd>
<dt><a href="#midi">midi(note)</a> ⇒ <code>Integer</code></dt>
<dd><p>Get midi of a note</p>
</dd>
<dt><a href="#freq">freq(note)</a> ⇒ <code>Float</code></dt>
<dd><p>Get freq of a note in hertzs (in a well tempered 440Hz A4)</p>
</dd>
</dl>

<a name="regex"></a>

## regex() ⇒ <code>RegExp</code>
A regex for matching note strings in scientific notation.

**Kind**: global function  
**Returns**: <code>RegExp</code> - the regexp used to parse the note name

The note string should have the form `letter[accidentals][octave][element]`
where:

- letter: (Required) is a letter from A to G either upper or lower case
- accidentals: (Optional) can be one or more `b` (flats), `#` (sharps) or `x` (double sharps).
They can NOT be mixed.
- octave: (Optional) a positive or negative integer
- element: (Optional) additionally anything after the duration is considered to
be the element name (for example: 'C2 dorian')

The executed regex contains (by array index):

- 0: the complete string
- 1: the note letter
- 2: the optional accidentals
- 3: the optional octave
- 4: the rest of the string (trimmed)  
**Example**  
```js
var parser = require('note-parser')
parser.regex.exec('c#4')
// => ['c#4', 'c', '#', '4', '']
parser.regex.exec('c#4 major')
// => ['c#4major', 'c', '#', '4', 'major']
parser.regex().exec('CMaj7')
// => ['CMaj7', 'C', '', '', 'Maj7']
```
<a name="parse"></a>

## parse(note, isTonic, tunning) ⇒ <code>Object</code>
Parse a note name in scientific notation an return it's components,
and some numeric properties including midi number and frequency.

**Kind**: global function  
**Returns**: <code>Object</code> - the parsed note name or null if not a valid note

The parsed note name object will ALWAYS contains:
- letter: the uppercase letter of the note
- acc: the accidentals of the note (only sharps or flats)
- pc: the pitch class (letter + acc)
- step: s a numeric representation of the letter. It's an integer from 0 to 6
where 0 = C, 1 = D ... 6 = B
- alt: a numeric representation of the accidentals. 0 means no alteration,
positive numbers are for sharps and negative for flats
- chroma: a numeric representation of the pitch class. It's like midi for
pitch classes. 0 = C, 1 = C#, 2 = D ... It can have negative values: -1 = Cb.
Can detect pitch class enhramonics.

If the note has octave, the parser object will contain:
- oct: the octave number (as integer)
- midi: the midi number
- freq: the frequency (using tuning parameter as base)

If the parameter `isTonic` is set to true, the parsed object will contain:
- tonicOf: the rest of the string that follows note name (left and right trimmed)  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>String</code> | the note string to be parsed |
| isTonic | <code>Boolean</code> | true if the note is the tonic of something. If true, en extra tonicOf property is returned. It's false by default. |
| tunning | <code>Float</code> | The frequency of A4 note to calculate frequencies. By default it 440. |

**Example**  
```js
var parse = require('note-parser').parse
parse('Cb4')
// => { letter: 'C', acc: 'b', pc: 'Cb', step: 0, alt: -1, chroma: -1,
        oct: 4, midi: 59, freq: 246.94165062806206 }
// if no octave, no midi, no freq
parse('fx')
// => { letter: 'F', acc: '##', pc: 'F##', step: 3, alt: 2, chroma: 7 })
```
<a name="midiToFreq"></a>

## midiToFreq(midi, tuning) ⇒ <code>Float</code>
Given a midi number, return its frequency

**Kind**: global function  
**Returns**: <code>Float</code> - frequency in hertzs  

| Param | Type | Description |
| --- | --- | --- |
| midi | <code>Integer</code> | midi note number |
| tuning | <code>Float</code> | (Optional) the A4 tuning (440Hz by default) |

<a name="midi"></a>

## midi(note) ⇒ <code>Integer</code>
Get midi of a note

**Kind**: global function  
**Returns**: <code>Integer</code> - the midi number of the note or null if not a valid note
or the note does NOT contains octave  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>String</code> | the note name |

**Example**  
```js
var parser = require('note-parser')
parser.midi('A4') // => 69
parser.midi('A') // => null
```
<a name="freq"></a>

## freq(note) ⇒ <code>Float</code>
Get freq of a note in hertzs (in a well tempered 440Hz A4)

**Kind**: global function  
**Returns**: <code>Float</code> - the freq of the number if hertzs or null if not valid note
or the note does NOT contains octave  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>String</code> | the note name |

**Example**  
```js
var parser = require('note-parser')
parser.freq('A4') // => 440
parser.freq('A') // => null
```
