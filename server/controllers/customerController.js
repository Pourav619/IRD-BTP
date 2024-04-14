const Customer = require('../models/Customer')
const mongoose = require('mongoose')


/**
 * GET
 *  Customer Routes
 */

exports.homepage = async (req,res) =>{
    // const messages = await req.consumeFlash('info')
    const locals = {
        title: 'Nodejs',
        description: 'Free Nodejs User Management system'
    }
    let perPage=12
    let page = req.query.page || 1
    try{
        // const customers = await Customer.find({}).limit(22)
        // res.render('index',{locals, customers})
        const customers= await Customer.aggregate([{$sort: {updatedAt: -1}}])
            .skip(perPage*page-perPage)
            .limit(perPage)
            .exec()
        const count = await Customer.countDocuments({})

        res.render('index',{
            locals,
            customers,
            current: page,
            pages: Math.ceil(count/perPage)
        })
    }
    catch(error){
        console.log(error)
    }

}



// exports.homepage = async (req,res) =>{
//     // const messages = await req.consumeFlash('info')
//     const locals = {
//         title: 'Nodejs',
//         description: 'Free Nodejs User Management system'
//     }
//     try{
//         const customers = await Customer.find({}).limit(22)
//         res.render('index',{locals, customers})
//     }
//     catch(error){
//         console.log(error)
//     }

// }


/**
 *  GET
 * New paper form
 */

exports.addCustomer = async (req,res) =>{
    const locals = {
        title: 'Add New Customer -NodeJs',
        description: 'Free Nodejs User Management system'
    }

    res.render('customer/add', locals)
}


/**
 *  Post
 * Create new paper
 */

// exports.postCustomer = async (req,res) =>{
//     console.log(req.body)

//     const newCustomer = new Customer({
//         Title: req.body.Title
//     })
//     const locals = {
//         title: 'New Paper added',
//         description: 'Free Nodejs User Management system'
//     }
//     try{
//         await Customer.create(newCustomer)
//         // await req.flash('info','New customer has been added')
//         res.redirect('/')
//     }
//     catch(error){
//         console.log(error)
//     }
// }



/**
 *  GET
 * Data
 */
exports.view = async (req, res) => {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });
    //   AuthorsName=customer.Authors[]
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("customer/view", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };



  /**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });
  
      const locals = {
        title: "Edit Customer Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("customer/edit", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };


  /**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
    try {
      await Customer.findByIdAndUpdate(req.params.id, {
    
        Title: req.body.Title,
        Authors: req.body.Authors,
        Journal: req.body.Journal,
        Volume: req.body.Volume,
        Pages: req.body.Pages,
        BookTitle: req.body.BookTitle,
        Organization: req.body.Organization,
        Publisher: req.body.Publisher,
        Number: req.body.Number,
        Year: req.body.Year,
        
      });
      await res.redirect(`/edit/${req.params.id}`);
  
      console.log("redirected");
    } catch (error) {
      console.log(error);
    }
  };