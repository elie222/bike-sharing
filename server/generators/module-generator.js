const unflatten = require('flat').unflatten
const { pascalCase, sentenceCase } = require('change-case')
const { inputRequired, addWithCustomData } = require('./utils')

module.exports = plop => {
  plop.setGenerator('module', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name?',
        validate: inputRequired('name'),
      },
      {
        type: 'checkbox',
        name: 'files',
        message: 'Which files do you generate?',
        choices: data => [
          {
            name: `${pascalCase(data.name)}Entity.ts`,
            value: 'entity',
            checked: true,
          },
          {
            name: `${pascalCase(data.name)}Resolver.ts`,
            value: 'resolver',
            checked: true,
          },
          {
            name: `${pascalCase(data.name)}Service.ts`,
            value: 'service',
            checked: true,
          },
        ],
      },
    ],
    actions: data => {
      // Parse data for easy templating
      data = unflatten(data)
      data.props = data.props || []
      data.haveRequiredProps = data.props.reduce((mem, prop) => mem || prop.required, false)

      data.props = data.props.map(prop => Object.assign({}, prop, { optional: !prop.required }))

      const basePath = `../src/modules/{{camelCase name}}/`

      const actions = []

      ;[
        {
          condition: 'entity',
          actions: [
            {
              path: `${basePath}{{pascalCase name}}Entity.ts`,
              templateFile: 'templates/module-entity.hbs',
            },
          ],
        },
        {
          condition: 'service',
          actions: [
            {
              path: `${basePath}{{pascalCase name}}Service.ts`,
              templateFile: 'templates/module-service.hbs',
            },
          ],
        },
        {
          condition: 'resolver',
          actions: [
            {
              path: `${basePath}{{pascalCase name}}Resolver.ts`,
              templateFile: 'templates/module-resolver.hbs',
            },
          ],
        },
      ].forEach(a => {
        if (data.files.includes(a.condition)) {
          a.actions.forEach(i => {
            actions.push(addWithCustomData(plop, i, data))
          })
        }
      })

      return actions
    },
  })
}
