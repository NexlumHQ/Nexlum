# Contributing to NEXLUM

Thank you for your interest in contributing.

## Development Setup

```bash
git clone https://github.com/NexlumHQ/nexlum.git
cd nexlum
npm install
cp .env.example .env
npm run dev
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes with tests
4. Run: `npm run lint && npm run test`
5. Submit a PR against the `develop` branch

## Commit Convention

```
feat: add agent memory persistence
fix: resolve marketplace listing bug
docs: update tokenomics section
test: add AgentRuntime unit tests
chore: update dependencies
```

## Code Style

- TypeScript strict mode
- ESLint + Prettier enforced
- Tests required for all new features

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
