# Zabbix Rack Monitoring (Custom frontend)

![](https://img.shields.io/badge/Zabbix%20Rack%20Monitoring-1.0.0%20PROD-orange?logo=textpattern)
![](https://img.shields.io/badge/Svelte-3.54-yellowgreen?logo=svelte)
![](https://img.shields.io/badge/Vite-4.0-yellowgreen?logo=vite)
![](https://img.shields.io/badge/Axios-1.2.2-yellowgreen?logo=axios)

![](https://img.shields.io/badge/Typescript-yellow?logo=typescript)
![](https://img.shields.io/badge/HTML%205-yellow?logo=html5)
![](https://img.shields.io/badge/CSS%203-yellow?logo=css3)

## Comandos

Los siguientes comandos se deben ejecutar en una terminal situada en la raíz del proyecto.

Para subir cambios al proyecto:

```
git add *
git commit -m "Feature/Cosas realizadas..."
git push
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

1. NPM, el package manager de Node.js/javascript. [Guía de instalación](https://phoenixnap.com/kb/install-node-js-npm-on-windows).

2. Git, para poder interactuar con éste repo: Aquí la [Guía de instalación](https://phoenixnap.com/kb/how-to-install-git-windows).

3. Clona el proyecto

```bash
> git clone https://github.com/Trison-AV-Lab/Zabbix-Rack-Monitoring.git
```

4. Con una terminal en la raíz del proyecto, instalar las librerías de Javascript:

```bash
> npm install
```

## Sobre Zabbix-Rack-Monitoring

Además de la instalación del frontend, será necesario:

- Instalar Ubuntu Server 20 en el equipo.
- Instalar XPanel
- Configurar demonio contra http://localhost/zabbix modo kiosk
- Instalar Zabbix Server, mysql, y demonio de Zabbix
  > Guía de instalación de <ins>Zabbix</ins> [Aquí](https://www.zabbix.com/download?zabbix=6.2&os_distribution=ubuntu&os_version=20.04&components=server_frontend_agent&db=mysql&ws=apache)
