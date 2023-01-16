# this is a script to create a new component in the src/components folder
read componentName

mkdir ./src/$componentName && cd ./src/components/$componentName && touch $componentName.controller.ts $componentName.routes.ts $componentName.model.ts $componentName.schema.ts $componentName.interfaces.ts $componentName.spec.ts
