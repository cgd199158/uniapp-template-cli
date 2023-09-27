module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
        'chore', // 不属于其他类型的类型
        'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
        'docs', // 文档更新
        'feat', // 新增功能
        'fix', // bug 修复
        'perf', // 性能优化
        'refactor', // 重构代码(既没有新增功能，也没有修复 bug)
        'revert', // 回滚某个更早之前的提交
        'style', // 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
        'test', // 新增测试用例或是更新现有测试
      ],
    ],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'scope-case': [0],
    'subject-full-stop': [0],
    'subject-case': [0],
  },
  prompt: {
    questions: {
      type: {
        description: "选择你要提交内容的更改类型, 例如: 'feat' 代表新功能, 'fix' 代表修复bug",
        enum: {
          feat: {
            description: '新功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'bug修复',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '文档更新',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '重构代码(既没有新增功能，也没有修复 bug)',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '性能优化',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          build: {
            description: '主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交',
            title: 'Builds',
            emoji: '🛠',
          },
        },
      },
      scope: {
        description: '填写修改的功能模块或组件名称',
      },
      subject: {
        description: '填写简短精炼的变更描述',
      },
      body: {
        description: '填写更改的详细描述',
      },
      isBreaking: {
        description: '是否存在破坏性更改?',
      },
      breakingBody: {
        description: '对破坏性更改的描述',
      },
      breaking: {
        description: '列出所有破坏性更改的变更',
      },
      isIssueAffected: {
        description: '此更改是否影响某些打开的问题?',
      },
      issuesBody: {
        description: '对影响的问题的描述',
      },
      issues: {
        description: '列出此更改影响的所有问题(例如: #123, #456)',
      },
    },
  },
}
