const RecetteFormTemplate = [
  {
    inputText: 'Nom',
    multiline: false,
    name: 'title',
    type: 'text',
    value: 'title'
  },
  {
    inputText: 'Courte description',
    multiline: false,
    name: 'description',
    type: 'text',
    value: 'description'
  },
  {
    inputText: 'Instructions',
    multiline: true,
    name: 'instructions',
    type: 'text',
    value: 'instructions'
  },
  {
    inputText: 'Ingrédients',
    multiline: true,
    name: 'ingredients',
    type: 'text',
    value: 'ingredients'
  },
  {
    inputText: 'Temps (en minutes)',
    multiline: false,
    name: 'time',
    type: 'text',
    value: 'time'
  },
]

export default RecetteFormTemplate;