const cron = require('node-cron');
const { generateDailyReport } = require('./dailyReport');

// Programar el reporte diario para las 9:00 AM todos los días
cron.schedule('0 9 * * *', () => {
  console.log('🤖 Running scheduled daily report...');
  generateDailyReport();
}, {
  timezone: "America/Mexico_City" // Ajusta a tu zona horaria
});

// Función para ejecutar el reporte manualmente (para pruebas)
const runDailyReportNow = async () => {
  console.log('🧪 Manual daily report execution...');
  return await generateDailyReport();
};

// Mensaje de inicialización
console.log('🤖 Daily Report Job initialized');
console.log('📅 Scheduled to run daily at 9:00 AM');

module.exports = {
  runDailyReportNow
};
