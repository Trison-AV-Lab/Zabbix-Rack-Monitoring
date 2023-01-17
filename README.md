# Zabbix Rack Monitoring (Custom frontend)

![Zabbix Rack Monitoring Version](https://img.shields.io/badge/Zabbix%20Rack%20Monitoring-1.0.0%20PROD-orange?logo=textpattern)
![Svelte Version](https://img.shields.io/badge/Svelte-3.54-yellowgreen?logo=svelte)
![Vite Version](https://img.shields.io/badge/Vite-4.0-yellowgreen?logo=vite)
![Axios Version](https://img.shields.io/badge/Axios-1.2.2-yellowgreen?logo=axios)
![Ubuntu Version](https://img.shields.io/badge/Ubuntu%20Server-20.04-blue?logo=ubuntu)
![MySQL Version](https://img.shields.io/badge/MySQL%20Server-8.0.31-blue?logo=mysql)
![Apache Version](https://img.shields.io/badge/Apache%202-2.4.41-blue?logo=apache)
![Node Version](https://img.shields.io/badge/Node-18.12.1-blue?logo=node.js)
![NPM Version](https://img.shields.io/badge/NPM-8.19.2-blue?logo=npm)

![Typescript](https://img.shields.io/badge/Typescript-yellow?logo=typescript)
![HTML](https://img.shields.io/badge/HTML%205-yellow?logo=html5)
![CSS](https://img.shields.io/badge/CSS%203-yellow?logo=css3)

## Comandos

Los siguientes comandos se deben ejecutar en una terminal situada en la raíz del proyecto.

Para subir cambios al proyecto:

```bash
> git add *
> git commit -m "Feature/Cosas realizadas..."
> git push
```

Ejecución en modo desarrollo

```bash
> npm run dev
```

Construir webapp para producción

```bash
> npm run build
```

## Requerimientos/Instalación

- NPM, el package manager de Node.js/javascript. [Guía de instalación](https://phoenixnap.com/kb/install-node-js-npm-on-windows).

- Git, para poder interactuar con éste repo: Aquí la [Guía de instalación](https://phoenixnap.com/kb/how-to-install-git-windows).

- Clona el proyecto

```bash
> git clone https://github.com/Trison-AV-Lab/Zabbix-Rack-Monitoring.git
```

- Con una terminal en la raíz del proyecto, instalar las librerías de Javascript:

```bash
> npm install
```

## Sobre Zabbix-Rack-Monitoring

Además de la instalación del frontend, será necesario:

- Instalar Ubuntu Server 20.04 en el equipo.
- Instalar XPanel
- Configurar demonio contra <http://localhost/zabbix> modo kiosk
- Instalar Zabbix Server, mysql, y demonio de Zabbix
  > Guía de [instalación de Zabbix](https://www.zabbix.com/download?zabbix=6.2&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache)
