const unflatten = require('flat').unflatten
const { pascalCase, sentenceCase } = require('change-case')
const { inputRequired, addWithCustomData } = require('./utils')

const MAX_PROPS = 10

const propsPrompts = []
;[...Array(MAX_PROPS)].forEach((v, i) => {
  propsPrompts.push(
    {
      type: 'confirm',
      name: '_props',
      message: () => (i === 0 ? 'Do you have props?' : 'Other props?'),
      when: data => i === 0 || data._props,
    },
    {
      type: 'input',
      name: `props.${i}.name`,
      message: 'Props name?',
      validate: inputRequired('props name'),
      when: data => data._props,
    },
    {
      type: 'input',
      name: `props.${i}.type`,
      message: 'Props type?',
      validate: inputRequired('props type'),
      when: data => data._props,
    },
    {
      type: 'confirm',
      name: `props.${i}.required`,
      message: 'Props is required?',
      when: data => data._props,
    }
  )
})

module.exports = plop => {
  plop.addHelper('propsHelper', text => `{${text}}`)
  plop.setGenerator('component', {
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
      },
      {
        type: 'input',
        name: 'query',
        message: 'What is the graphql query that will be made (leave blank if none)?',
      },
      {
        type: 'input',
        name: 'mutation',
        message: 'What is the graphql mutation that will be made (leave blank if none)?',
      },
      ...propsPrompts,
      {
        type: 'checkbox',
        name: 'files',
        message: 'Which files do you generate?',
        choices: data => [
          {
            name: `${pascalCase(data.name)}.tsx`,
            value: 'component',
            checked: true,
          },
          // {
          //   name: `${pascalCase(data.name)}.test.tsx`,
          //   value: 'test',
          //   checked: true,
          // },
          {
            name: `${pascalCase(data.name)}.stories.tsx`,
            value: 'stories',
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

      // if (data.files.indexOf('withData') !== -1) {
      //   data.props.push({ name: 'items', type: 'any', required: true, optional: false })
      //   data.haveRequiredProps = true
      // }

      data.usesGql = data.query || data.mutation

      const basePath = data.files.length
        ? `../src/${data.folder || 'components'}/{{pascalCase name}}/`
        : `../src/${data.folder || 'components'}/`

      const actions = []

      ;[
        {
          condition: 'component',
          actions: [
            {
              type: 'add',
              path: `${basePath}index.tsx`,
              templateFile: 'templates/component-index-tsx.hbs',
            },
          ],
        },
        {
          condition: 'component',
          actions: [
            {
              path: `${basePath}{{pascalCase name}}.tsx`,
              templateFile: 'templates/component-tsx.hbs',
            },
          ],
        },
        // {
        //   condition: 'test',
        //   actions: [
        //     {
        //       path: `${basePath}{{pascalCase name}}.test.tsx`,
        //       templateFile: 'templates/component-test-tsx.template',
        //     },
        //   ],
        // },
        {
          condition: 'stories',
          actions: [
            {
              path: `${basePath}{{pascalCase name}}.stories.tsx`,
              templateFile: 'templates/component-stories-tsx.hbs',
            },
          ],
        },
        // {
        //   condition: 'withData',
        //   actions: [
        //     {
        //       path: `${basePath}{{pascalCase name}}WithData.tsx`,
        //       templateFile: 'templates/component-with-data-tsx.hbs',
        //     },
        //   ],
        // },
        // {
        //   condition: 'withMutation',
        //   actions: [
        //     {
        //       path: `${basePath}{{pascalCase name}}WithMutation.tsx`,
        //       templateFile: 'templates/component-with-mutation-tsx.hbs',
        //     },
        //   ],
        // },
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
