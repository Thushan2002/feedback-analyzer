.PHONY: lint lint-fix format typecheck check

lint:
	uv run ruff check .

lint-fix:
	uv run ruff check --fix .

format:
	uv run ruff format .

typecheck:
	uv run mypy app/

check: lint typecheck