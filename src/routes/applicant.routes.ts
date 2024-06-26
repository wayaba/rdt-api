/**
 *  @swagger
 * tags:
 *   name: Applicants
 *   description: Endpoints relacionados con los postulantes
 */

/**
 * @swagger
 * /applicants/update:
 *   post:
 *     tags:
 *       - Applicants
 *     summary: Update applicant details and image
 *     description: Update the details and image of an applicant.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the applicant.
 *               lastName:
 *                 type: string
 *                 description: The last name of the applicant.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the applicant.
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the applicant.
 *               address:
 *                 type: string
 *                 description: The address of the applicant.
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the applicant.
 *               province:
 *                 type: string
 *                 description: The province of the applicant.
 *               cityRegion:
 *                 type: string
 *                 description: The city or region of the applicant.
 *               gender:
 *                 type: string
 *                 description: The gender of the applicant.
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The birth date of the applicant in ISO 8601 format (YYYY-MM-DD).
 *               birthPlace:
 *                 type: string
 *                 description: The birth place of the applicant.
 *               nationality:
 *                 type: string
 *                 description: The nationality of the applicant.
 *               maritalStatus:
 *                 type: string
 *                 description: The marital status of the applicant.
 *               linkedIn:
 *                 type: string
 *                 description: The LinkedIn profile of the applicant.
 *               webSite:
 *                 type: string
 *                 description: The website of the applicant.
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Successfully updated applicant details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       '400':
 *         description: Bad request - Invalid input or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '404':
 *         description: Not Found - Applicant not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '500':
 *         description: Internal server error - Generic error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 * /applicants/:
 *   get:
 *     tags:
 *       - Applicants
 *     summary: Obtiene los datos del solicitante.
 *     description: Obtiene los datos del solicitante autenticado.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Datos del solicitante obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applicant:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           description: Nombre de usuario.
 *                         email:
 *                           type: string
 *                           description: Dirección de correo electrónico.
 *                         password:
 *                           type: string
 *                           description: Contraseña del usuario.
 *                         code:
 *                           type: string
 *                           description: Código de usuario.
 *                         status:
 *                           type: string
 *                           enum: [UNVERIFIED, VERIFIED, SUSPENDED]
 *                           description: Estado del usuario.
 *                         userType:
 *                           type: string
 *                           enum: [APPLICANT, COMPANY, ADMIN]
 *                           description: Tipo de usuario.
 *                     image:
 *                       type: object
 *                       properties:
 *                         secure_url:
 *                           type: string
 *                           description: URL segura de la imagen.
 *                         public_id:
 *                           type: string
 *                           description: ID público de la imagen.
 *                     name:
 *                       type: string
 *                       description: Nombre del solicitante.
 *                     lastName:
 *                       type: string
 *                       description: Apellido del solicitante.
 *       '401':
 *         description: No autorizado - Fallo en la autenticación del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica la causa del fallo.
 *       '500':
 *         description: Error interno del servidor - Error genérico.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica la causa del fallo.
 * /applicants/add-education:
 *   post:
 *     summary: Add education details for an applicant.
 *     description: Add education details including institution, degree, start date, end date, and description for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *                 description: The name of the institution.
 *               degree:
 *                 type: string
 *                 description: The degree obtained.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of education (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of education (optional).
 *               description:
 *                 type: string
 *                 description: Description of the education (optional).
 *                 maxLength: 2000
 *     responses:
 *       '201':
 *         description: Education details added successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/add-education/{educationId}:
 *   put:
 *     summary: Update education details for an applicant.
 *     description: Update education details including institution, degree, start date, end date, and description for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: ID of the education record to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *                 description: The name of the institution.
 *               degree:
 *                 type: string
 *                 description: The degree obtained.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of education (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of education (optional).
 *               description:
 *                 type: string
 *                 description: Description of the education (optional).
 *                 maxLength: 2000
 *     responses:
 *       '201':
 *         description: Education details updated successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant or education not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-education:
 *   get:
 *     summary: Get education details for an applicant.
 *     description: Retrieve education details including institution, degree, start date, end date, and description for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Education details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 educations:
 *                   type: array
 *                   description: List of education records.
 *                   items:
 *                     type: object
 *                     properties:
 *                       institution:
 *                         type: string
 *                         description: The name of the institution.
 *                       degree:
 *                         type: string
 *                         description: The degree obtained.
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: The start date of education.
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: The end date of education.
 *                       description:
 *                         type: string
 *                         description: Description of the education.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-education/{educationId}:
 *   get:
 *     summary: Get education details by ID.
 *     description: Retrieve education details by its ID.
 *     tags:
 *       - Applicants
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: ID of the education record to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Education details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 institution:
 *                   type: string
 *                   description: The name of the institution.
 *                 degree:
 *                   type: string
 *                   description: The degree obtained.
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   description: The start date of education.
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: The end date of education.
 *                 description:
 *                   type: string
 *                   description: Description of the education.
 *       '404':
 *         description: Education not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the education was not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *
 * /applicants/delete-education/{educationId}:
 *   delete:
 *     summary: Delete education by ID.
 *     description: Delete education details by its ID.
 *     tags:
 *       - Applicants
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: ID of the education record to delete.
 *         schema:
 *           type: string
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Education deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the education was deleted.
 *       '404':
 *         description: Education not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the education was not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 * /applicants/add-work-experience:
 *   post:
 *     summary: Add work experience for an applicant.
 *     description: Add work experience including position, employment type, company name, location, work modality, industry, description, start date, end date, and skills for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 description: The position held in the job.
 *               employmentType:
 *                 type: string
 *                 description: The type of employment.
 *               companyName:
 *                 type: string
 *                 description: The name of the company.
 *               location:
 *                 type: string
 *                 description: The location of the job (optional).
 *               workModality:
 *                 type: string
 *                 description: The work modality (e.g., full-time, part-time).
 *               industry:
 *                 type: string
 *                 description: The industry of the job (optional).
 *               description:
 *                 type: string
 *                 description: Description of the work experience (optional).
 *                 maxLength: 2000
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the work experience (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the work experience (optional).
 *               skills:
 *                 type: string
 *                 description: Skills acquired during the work experience (optional).
 *     responses:
 *       '201':
 *         description: Work experience added successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant or employment type or work modality not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/add-work-experience/{workExperienceId}:
 *   put:
 *     summary: Update work experience details for an applicant.
 *     description: Update work experience details including position, employment type, company name, location, work modality, industry, description, start date, end date, and skills for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: workExperienceId
 *         required: true
 *         description: ID of the work experience record to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 description: The position held in the job.
 *               employmentType:
 *                 type: string
 *                 description: The type of employment.
 *               companyName:
 *                 type: string
 *                 description: The name of the company.
 *               location:
 *                 type: string
 *                 description: The location of the job (optional).
 *               workModality:
 *                 type: string
 *                 description: The work modality (e.g., full-time, part-time).
 *               industry:
 *                 type: string
 *                 description: The industry of the job (optional).
 *               description:
 *                 type: string
 *                 description: Description of the work experience (optional).
 *                 maxLength: 2000
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the work experience (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the work experience (optional).
 *               skills:
 *                 type: string
 *                 description: Skills acquired during the work experience (optional).
 *     responses:
 *       '201':
 *         description: Work experience details updated successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant or work experience not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-work-experience:
 *   get:
 *     summary: Get work experiences for an applicant.
 *     description: Retrieve work experiences for the authenticated applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Work experiences retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workExperiences:
 *                   type: array
 *                   description: List of work experiences.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the work experience record.
 *                       position:
 *                         type: string
 *                         description: The position held in the work experience.
 *                       employmentType:
 *                         type: string
 *                         description: The type of employment for the work experience.
 *                       companyName:
 *                         type: string
 *                         description: The name of the company for the work experience.
 *                       location:
 *                         type: string
 *                         description: The location of the work experience.
 *                       workModality:
 *                         type: string
 *                         description: The work modality for the work experience.
 *                       industry:
 *                         type: string
 *                         description: The industry of the work experience.
 *                       description:
 *                         type: string
 *                         description: Description of the work experience.
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: The start date of the work experience.
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: The end date of the work experience.
 *                       skills:
 *                         type: string
 *                         description: Skills acquired during the work experience.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '404':
 *         description: Not found. Applicant not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 * /applicants/get-work-experience/{workExperienceId}:
 *   get:
 *     summary: Get a specific work experience for an applicant.
 *     description: Retrieve a specific work experience record by ID for the authenticated applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: workExperienceId
 *         required: true
 *         description: ID of the work experience record to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Work experience retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 existingWorkExperience:
 *                   type: object
 *                   description: Details of the work experience.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '404':
 *         description: Not found. Work experience record not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 * /applicants/delete-work-experience/{workExperienceId}:
 *   delete:
 *     summary: Delete a work experience record for an applicant.
 *     description: Delete a work experience record by ID for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: workExperienceId
 *         required: true
 *         description: ID of the work experience record to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Work experience record deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       '400':
 *         description: Bad request. The provided ID is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '404':
 *         description: Not found. Work experience record not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 * /applicants/add-language:
 *   post:
 *     summary: Add language details for an applicant.
 *     description: Add language details including competence and language type for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competence:
 *                 type: string
 *                 description: The competence of the applicant in the language.
 *               language:
 *                 type: string
 *                 description: The language type.
 *     responses:
 *       '201':
 *         description: Language details added successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant not found or competence not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/add-language/{languageId}:
 *   put:
 *     summary: Update language details for an applicant.
 *     description: Update language details including competence and language type for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         description: ID of the language record to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competence:
 *                 type: string
 *                 description: The competence of the applicant in the language.
 *               language:
 *                 type: string
 *                 description: The language type.
 *     responses:
 *       '201':
 *         description: Language details updated successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant not found, language not found, or competence not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-language:
 *   get:
 *     summary: Get all languages for the authenticated applicant.
 *     description: Retrieve all languages associated with the authenticated applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved languages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the language.
 *                       language:
 *                         type: string
 *                         description: The language.
 *                       competence:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The unique identifier for the competence.
 *                           name:
 *                             type: string
 *                             description: The name of the competence.
 *                           level:
 *                             type: string
 *                             description: The level of the competence.
 *                       applicant:
 *                         type: string
 *                         description: The ID of the applicant to whom the language belongs.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the language was created.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the language was last updated.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant not found or no languages associated with the applicant.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-language/{languageId}:
 *   get:
 *     summary: Get language details for a specific language of the authenticated applicant.
 *     description: Retrieve language details for a specific language associated with the authenticated applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         description: ID of the language record to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Language details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the language.
 *                 language:
 *                   type: string
 *                   description: The language.
 *                 competence:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier for the competence.
 *                     name:
 *                       type: string
 *                       description: The name of the competence.
 *                     level:
 *                       type: string
 *                       description: The level of the competence.
 *                 applicant:
 *                   type: string
 *                   description: The ID of the applicant to whom the language belongs.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the language was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the language was last updated.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Language not found or not associated with the authenticated applicant.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/delete-language/{languageId}:
 *   delete:
 *     summary: Delete a language record.
 *     description: Delete a language record associated with the authenticated applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         description: ID of the language record to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Language record deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the language record was deleted.
 *       '400':
 *         description: Bad request. The provided language ID is not valid.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Language record not found or not associated with the authenticated applicant.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-cv/{applicantId}:
 *   get:
 *     summary: Get CV of an applicant.
 *     description: Retrieve the CV of a specific applicant, including their personal information, work experiences, educations, and languages.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: applicantId
 *         required: true
 *         description: ID of the applicant to retrieve the CV for.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CV retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applicant:
 *                   type: object
 *                   description: Information about the applicant.
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: ID of the user associated with the applicant.
 *                     image:
 *                       type: object
 *                       properties:
 *                         secure_url:
 *                           type: string
 *                           description: URL of the applicant's image.
 *                         public_id:
 *                           type: string
 *                           description: Public ID of the applicant's image.
 *                     name:
 *                       type: string
 *                       description: Name of the applicant.
 *                     lastName:
 *                       type: string
 *                       description: Last name of the applicant.
 *                     phoneNumber:
 *                       type: string
 *                       description: Phone number of the applicant.
 *                     address:
 *                       type: string
 *                       description: Address of the applicant.
 *                     postalCode:
 *                       type: string
 *                       description: Postal code of the applicant's address.
 *                     province:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the province.
 *                         description:
 *                           type: string
 *                           description: Description of the province.
 *                       description: Province of the applicant.
 *                     cityRegion:
 *                       type: string
 *                       description: City or region of the applicant's address.
 *                     gender:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the gender.
 *                         description:
 *                           type: string
 *                           description: Description of the gender.
 *                       description: Gender of the applicant.
 *                     birthDate:
 *                       type: string
 *                       format: date
 *                       description: Birth date of the applicant.
 *                     birthPlace:
 *                       type: string
 *                       description: Birth place of the applicant.
 *                     nationality:
 *                       type: string
 *                       description: Nationality of the applicant.
 *                     maritalStatus:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the marital status.
 *                         description:
 *                           type: string
 *                           description: Description of the marital status.
 *                       description: Marital status of the applicant.
 *                     linkedIn:
 *                       type: string
 *                       description: LinkedIn profile of the applicant.
 *                     webSite:
 *                       type: string
 *                       description: Website of the applicant.
 *                 workExperiences:
 *                   type: array
 *                   description: List of work experiences of the applicant.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the work experience.
 *                       description:
 *                         type: string
 *                         description: Description of the work experience.
 *                 educations:
 *                   type: array
 *                   description: List of educations of the applicant.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the education.
 *                       description:
 *                         type: string
 *                         description: Description of the education.
 *                 languages:
 *                   type: array
 *                   description: List of languages of the applicant.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the language.
 *                       description:
 *                         type: string
 *                         description: Description of the language.
 *       '400':
 *         description: Bad request. The provided applicant ID is not valid.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { ApplicantController } from '../controllers/applicant'
import { uploadMiddleware } from '../middlewares/upload'

const router = Router()

router.post(
  '/update',
  [authMiddleware, uploadMiddleware],
  ApplicantController.update
)

router.get('/', [authMiddleware], ApplicantController.get)
router.post(
  '/add-education',
  [authMiddleware],
  ApplicantController.addEducation
)
router.put(
  '/add-education/:educationId',
  [authMiddleware],
  ApplicantController.updateEducation
)
router.get(
  '/get-education',
  [authMiddleware],
  ApplicantController.getEducations
)
router.get(
  '/get-education/:educationId',
  [authMiddleware],
  ApplicantController.getEducation
)
router.delete(
  '/delete-education/:educationId',
  [authMiddleware],
  ApplicantController.deleteEducation
)

router.post(
  '/add-work-experience',
  [authMiddleware],
  ApplicantController.addWorkExperience
)
router.put(
  '/add-work-experience/:workExperienceId',
  [authMiddleware],
  ApplicantController.updateWorkExperience
)
router.get(
  '/get-work-experience',
  [authMiddleware],
  ApplicantController.getWorkExperiences
)
router.get(
  '/get-work-experience/:workExperienceId',
  [authMiddleware],
  ApplicantController.getWorkExperience
)
router.delete(
  '/delete-work-experience/:workExperienceId',
  [authMiddleware],
  ApplicantController.deleteWorkExperience
)

router.post('/add-language', [authMiddleware], ApplicantController.addLanguage)
router.put(
  '/add-language/:languageId',
  [authMiddleware],
  ApplicantController.updateLanguage
)
router.get('/get-language', [authMiddleware], ApplicantController.getLanguages)
router.get(
  '/get-language/:languageId',
  [authMiddleware],
  ApplicantController.getLanguage
)
router.delete(
  '/delete-language/:languageId',
  [authMiddleware],
  ApplicantController.deleteLanguage
)

router.get('/get-cv/:applicantId', [authMiddleware], ApplicantController.getCV)

export default router
