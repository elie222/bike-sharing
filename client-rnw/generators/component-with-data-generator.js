const { inputRequired } = require('./utils')

module.exports = plop => {
  plop.setGenerator('componentWithData', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
        validate: inputRequired('name'),
      },
      {
        type: 'input',
        name: 'folder',
        message: 'Parent folder?',
        validate: inputRequired('name'),
      },
    ],
    actions: data => {
      const basePath = `../src/${data.folder}/`

      return [
        {
          type: 'add',
          path: `${basePath}{{pascalCase name}}WithData.tsx`,
          templateFile: 'templates/component-with-data-tsx.hbs',
        },
      ]
    },
  })
}
