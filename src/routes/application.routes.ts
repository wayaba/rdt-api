/**
 *  @swagger
 * tags:
 *   name: Applications
 *   description: Endpoints relacionados con las postulaciones
 */

/**
 * @swagger
 * /applications/create:
 *   post:
 *     tags:
 *       - Applications
 *     summary: Crear una aplicación
 *     description: Crea una nueva aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job:
 *                 type: string
 *                 description: ID del trabajo al que aplicar.
 *             required:
 *               - job
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Aplicación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Solicitud incorrecta. Datos inválidos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: No autorizado. El usuario no está autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Solicitante o trabajo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Obtener todas las aplicaciones del solicitante
 *     description: Recupera todas las aplicaciones asociadas al solicitante autenticado.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Una lista de aplicaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       job:
 *                         type: object
 *                         properties:
 *                           company:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           duration:
 *                             type: number
 *                           creationDate:
 *                             type: string
 *                           status:
 *                             type: string
 *                           id:
 *                             type: string
 *                       applicant:
 *                         type: string
 *                       status:
 *                         type: string
 *                       creationDate:
 *                         type: string
 *                       id:
 *                         type: string
 *       '401':
 *         description: No autorizado. El usuario no está autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Solicitante no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /applications/all:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Obtener todas las aplicaciones
 *     description: Recupera todas las aplicaciones con parámetros opcionales de paginación y búsqueda.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Número de elementos a devolver por página.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Campo por el cual ordenar. Prefijo '-' para orden descendente.
 *       - in: query
 *         name: searchParam
 *         schema:
 *           type: string
 *         description: Parámetro de búsqueda para filtrar aplicaciones (por ejemplo, título, descripción).
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Una lista de aplicaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           job:
 *                             type: object
 *                             properties:
 *                               company:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               duration:
 *                                 type: number
 *                               creationDate:
 *                                 type: string
 *                               status:
 *                                 type: string
 *                               id:
 *                                 type: string
 *                           applicant:
 *                             type: string
 *                           status:
 *                             type: string
 *                           creationDate:
 *                             type: string
 *                           id:
 *                             type: string
 *                     totalDocs:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pagingCounter:
 *                       type: integer
 *                     hasPrevPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     prevPage:
 *                       type: null
 *                     nextPage:
 *                       type: null
 *       '401':
 *         description: No autorizado. No se permiten los parámetros especificados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { ApplicationController } from '../controllers/application'

const router = Router()

router.post('/create', [authMiddleware], ApplicationController.create)
router.get('/', [authMiddleware], ApplicationController.get)
router.get('/all', [authMiddleware], ApplicationController.getAll)

export default router
