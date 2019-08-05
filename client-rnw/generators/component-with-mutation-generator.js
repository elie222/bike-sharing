const { inputRequired } = require('./utils')

module.exports = plop => {
  plop.setGenerator('componentWithMutation', {
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
          path: `${basePath}{{pascalCase name}}WithMutation.tsx`,
          templateFile: 'templates/component-with-mutation-tsx.hbs',
        },
      ]
    },
  })
}
