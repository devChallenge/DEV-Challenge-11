.PHONY: requirements freeze syncdb user install exec up down ps test loaddata clean

requirements:
	-@echo "### Installing requirements"
	-@docker-compose exec web pip3 install -r etc/requirements.txt

freeze:
	-@echo "### Freezing python packages to requirements.txt"
	-@docker-compose exec web pip3 freeze > etc/requirements.txt

syncdb:
	-@echo "### Creating database tables and loading fixtures"
	-@docker-compose exec web python3 project/manage.py makemigrations
	-@docker-compose exec web python3 project/manage.py migrate

user:
	-@docker-compose exec web python3 project/manage.py createsuperuser

ifeq (install,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
install:
	-@echo $(RUN_ARGS) >> etc/requirements.txt
	-@docker-compose up -d --build
	-@docker-compose exec web pip3 freeze > etc/requirements.txt

ifeq (exec,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
exec:
	-@docker-compose exec web python3 project/manage.py $(RUN_ARGS)

up:
	-@docker-compose up -d --build

down:
	-@docker-compose down

ps:
	-@docker-compose ps

test:
	-@docker-compose exec web python3 project/manage.py test project/

loaddata:
	-@docker-compose exec web python3 project/manage.py loaddata etc/fixtures/*

clean:
	-@echo "### Cleaning *.pyc and .DS_Store files"
	-@find . | grep -E "(__pycache__|\.pyc|\.pyo|\.DS_Store)" | xargs rm -rf
