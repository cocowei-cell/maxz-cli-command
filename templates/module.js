const getController = (name) => {
  const Uppername = name[0].toUpperCase() + name.substr(1);
  return (
    `
    import { Body, Controller, Post, Query, Get } from '@nestjs/common';
    import { ${Uppername}Service } from './${name}.service';
    
    @Controller('${name}')
    export class ${Uppername}Controller {
      constructor(private readonly ${name}Service: ${Uppername}Service) {}
      @Get('index')
      async index(@Query() query) {
        console.log(query);
        const data = await this.${name}Service.index(query);
        return data;
      }
    }
    `
  )
}

const getService = (name) => {
  const Uppername = name[0].toUpperCase() + name.substr(1);
  return (
    `
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class ${Uppername}Service {
    async index(query:any) {
      return 'index'
  }
}
    `
  )
}

const getModule = (name) => {
  const Uppername = name[0].toUpperCase() + name.substr(1);
  return (
    `
    import { Module } from '@nestjs/common';
    import { ${Uppername}Service } from './${name}.service';
    import { ${Uppername}Controller } from './${name}.controller';
    
    @Module({
      providers: [${Uppername}Service],
      controllers: [${Uppername}Controller]
    })
    export class ${Uppername}Module {}
    `
  )
}

module.exports = {
  getController,
  getModule,
  getService
}