const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');

/**
 * Genera un reporte diario con estadísticas de la API
 */
const generateDailyReport = async () => {
  const timestamp = new Date().toISOString();
  const today = new Date().toDateString();
  
  console.log(`\n📊 ===== DAILY REPORT - ${today} =====`);
  console.log(`🕐 Generated at: ${timestamp}`);
  
  try {
    // Calcular fecha de hace 24 horas
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Consultas en paralelo para mejor rendimiento
    const [
      activeUsers,
      newUsers,
      totalProducts,
      newProducts,
      totalCategories,
      newCategories
    ] = await Promise.all([
      // Usuarios activos (state: true)
      User.countDocuments({ state: true }),
      
      // Nuevos usuarios en las últimas 24h
      User.countDocuments({ 
        state: true,
        createdAt: { $gte: yesterday } 
      }),
      
      // Productos activos
      Product.countDocuments({ state: true }),
      
      // Nuevos productos en las últimas 24h
      Product.countDocuments({ 
        state: true,
        createdAt: { $gte: yesterday } 
      }),
      
      // Categorías activas
      Category.countDocuments({ state: true }),
      
      // Nuevas categorías en las últimas 24h
      Category.countDocuments({ 
        state: true,
        createdAt: { $gte: yesterday } 
      })
    ]);

    // Mostrar estadísticas
    console.log(`👥 Active Users: ${activeUsers}`);
    console.log(`🆕 New Users (24h): ${newUsers}`);
    console.log(`📦 Active Products: ${totalProducts}`);
    console.log(`🆕 New Products (24h): ${newProducts}`);
    console.log(`📂 Active Categories: ${totalCategories}`);
    console.log(`🆕 New Categories (24h): ${newCategories}`);
    
    // Calcular porcentajes de crecimiento
    const userGrowth = activeUsers > 0 ? ((newUsers / activeUsers) * 100).toFixed(2) : 0;
    const productGrowth = totalProducts > 0 ? ((newProducts / totalProducts) * 100).toFixed(2) : 0;
    
    console.log(`📈 User Growth (24h): ${userGrowth}%`);
    console.log(`📈 Product Growth (24h): ${productGrowth}%`);
    console.log(`✅ Report generated successfully!\n`);
    
    return {
      timestamp,
      stats: {
        users: { active: activeUsers, new: newUsers, growth: userGrowth },
        products: { active: totalProducts, new: newProducts, growth: productGrowth },
        categories: { active: totalCategories, new: newCategories }
      }
    };
    
  } catch (error) {
    console.error(`❌ Error generating daily report: ${error.message}`);
    return null;
  }
};

module.exports = {
  generateDailyReport
};
