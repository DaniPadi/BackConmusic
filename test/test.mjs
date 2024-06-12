import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { register, login } from '../src/controladores/persona.js';
import { encriptarContraseña } from '../src/middleware/encrypt.js';
import * as chai from 'chai';
import express from 'express';
import sinon from 'sinon';
import request from 'supertest';
import Musica from '../src/modelos/musica.js';
import playlist from '../src/modelos/playlist.js';
import router from '../src/rutas/persona.js';

chai.use(chaiHttp);

describe('Pruebas de Usuario', function () {
    let server;
    before(async function () {
        server = await import('../src/index.js');
    });

    describe('Registro de usuarios', function () {
        it('Verificar registro exitoso con datos válidos', async function () {
            const persona = {
                nombre: "Juan",
                correo: "juan@example.com",
                instrumento: "Guitarra",
                pass: "password123",
                fecha_nacimiento: "1990-01-01",
                apellido: "Pérez"
            };
            try {
                await register(persona);
                expect(true).to.be.true;
            } catch (error) {
                expect.fail("Registro falló con datos válidos");
            }
        });

        it('Verificar mensaje de error al intentar registrar con datos inválidos', async function () {
            const persona = {
                nombre: "", // Nombre inválido
                correo: "correo_invalido",
                instrumento: "Guitarra",
                pass: "pass",
                fecha_nacimiento: "1990-01-01",
                apellido: "Pérez"
            };
            try {
                await register(persona);
                expect.fail("El registro debería fallar con datos inválidos");
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Verificar creación exitosa de cuenta de usuario en la base de datos', async function () {
            const persona = {
                nombre: "Ana",
                correo: "ana@example.com",
                instrumento: "Piano",
                pass: "securePass123",
                fecha_nacimiento: "1985-05-05",
                apellido: "Gómez"
            };
            try {
                await register(persona);
                expect(true).to.be.true;
            } catch (error) {
                expect.fail("Registro falló con datos válidos");
            }
        });
    });

    describe('Autenticación de usuarios', function () {
        it('Verificar inicio de sesión exitoso con credenciales válidas', async function () {
            const persona = {
                correo: "juan@example.com",
                pass: "password123"
            };
            try {
                const res = {
                    json: function (response) {
                        expect(response.token).to.exist;
                    },
                    status: function (code) {
                        return {
                            send: function (message) {
                                expect(code).to.not.equal(403);
                            }
                        };
                    }
                };
                await login(persona, res);
            } catch (error) {
                expect.fail("Inicio de sesión falló con credenciales válidas");
            }
        });

        it('Verificar mensaje de error al intentar iniciar sesión con credenciales inválidas', async function () {
            const persona = {
                correo: "juan@example.com",
                pass: "wrongPassword"
            };
            try {
                const res = {
                    json: function (response) {
                        expect.fail("Inicio de sesión debería fallar con credenciales inválidas");
                    },
                    status: function (code) {
                        return {
                            send: function (message) {
                                expect(code).to.equal(403);
                            }
                        };
                    }
                };
                await login(persona, res);
            } catch (error) {
                expect.fail("Error en el servidor durante el inicio de sesión");
            }
        });
    });

    describe('Pruebas de Reproducción y Descarga de Canciones', function () {
        describe('Reproducción de Canciones', function () {
            it('Debería devolver el archivo de la canción solicitada', function (done) {
                chai.request(server)
                    .get('/musicas')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });
        });

        describe('Descarga de Canciones', function () {
            it('Debería agregar una nueva canción', function (done) {
                const nuevaCancion = {
                    nombre: 'Canción de prueba',
                    autor: 'Autor de prueba'
                };
                chai.request(server)
                    .post('/musicas')
                    .send(nuevaCancion)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.equal('finalizo');
                        done();
                    });
            });
        });
    });
});
