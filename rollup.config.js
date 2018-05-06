import typescript from 'rollup-plugin-typescript2'
import browsersync from 'rollup-plugin-browsersync'

const targets = [
  {
    input: 'src/index.ts',

    output: {
      file: 'dist/beau.js',
      format: 'es'
    },

    plugins: [
      typescript({
        cacheRoot: `/tmp/.rpt2_cache`
      })
    ]
  },
]

if (process.env.BUILD !== 'production') {
  targets.push({
    input: 'examples/index.js',

    output: {
      file: 'examples/dist/index.js',
      format: 'cjs'
    },

    plugins: [
      browsersync({
        server: {
          baseDir: './examples'
        }
      })
    ]
  })
}

export default targets