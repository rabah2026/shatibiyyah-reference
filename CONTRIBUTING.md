# Contributing to Shatibiyyah API

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/shatibiyyah-api.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`
5. Set up the database: `pnpm db:push`

## Development Workflow

### Running the Project

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Format code
pnpm format

# Type checking
pnpm check
```

### Making Changes

1. **Create a feature branch** from `main`
2. **Make your changes** following the code style
3. **Write tests** for new features
4. **Update documentation** if needed
5. **Commit with clear messages**

### Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for all new features
- Ensure all tests pass: `pnpm test`
- Aim for high test coverage
- Test both happy paths and edge cases

### Database Changes

If you modify the database schema:

1. Update `drizzle/schema.ts`
2. Run `pnpm db:push`
3. Update the seed script if needed
4. Document the changes

## Commit Guidelines

Use clear, descriptive commit messages:

```
feat: Add search functionality for verses
fix: Correct Arabic text encoding issue
docs: Update API documentation
style: Format code according to standards
test: Add tests for verse search
chore: Update dependencies
```

## Pull Request Process

1. **Update your branch** with the latest main: `git pull origin main`
2. **Ensure tests pass**: `pnpm test`
3. **Create a Pull Request** with a clear description
4. **Link related issues** if applicable
5. **Wait for review** and address feedback

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Related Issues
Closes #(issue number)

## Testing
Describe how you tested the changes

## Checklist
- [ ] Tests pass
- [ ] Code is formatted
- [ ] Documentation updated
- [ ] No breaking changes
```

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots/logs if applicable

### Feature Requests

Include:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Any related issues or discussions

## Project Structure

```
shatibiyyah-api/
├── client/          # React frontend
├── server/          # Express + tRPC backend
├── drizzle/         # Database schema
├── tests/           # Test files
└── docs/            # Documentation
```

## Key Files

- `server/routers.ts` - API endpoints
- `server/db.ts` - Database queries
- `drizzle/schema.ts` - Database schema
- `client/src/pages/Home.tsx` - Main UI page

## Areas for Contribution

- Bug fixes
- Performance improvements
- Documentation improvements
- New features
- Test coverage
- UI/UX improvements
- Accessibility enhancements
- Internationalization

## Questions?

- Check existing issues and discussions
- Read the [API Documentation](./API_DOCUMENTATION.md)
- Review the [README](./README.md)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Shatibiyyah API!
