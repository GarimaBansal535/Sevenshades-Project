
from django.contrib import admin
from django.urls import path
from sevenshadesapp import maincategory_view
from sevenshadesapp import subcategory_view
from sevenshadesapp import brand_view
from sevenshadesapp import product_view
from sevenshadesapp import productdetail_view
from sevenshadesapp import banner_view
from sevenshadesapp import adminlogin_view
from sevenshadesapp import userinterface

from django.urls import include,re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/maincategory_submit',maincategory_view.MainCategory_Submit),
    re_path(r'^api/maincategory_list',maincategory_view.MainCategory_List),
    re_path(r'^api/editcategory_icon',maincategory_view.EditCategory_Icon),
    re_path(r'^api/editcategory_data',maincategory_view.EditCategory_Data),
    re_path(r'^api/deletecategory_data',maincategory_view.DeleteCategory_Data),
    
    re_path(r'^api/subcategory_submit',subcategory_view.SubCategory_Submit),
    re_path(r'^api/subcategory_list',subcategory_view.SubCategory_List),
    re_path(r'^api/deletesubcategory_data',subcategory_view.DeleteSubCategory_Data),
    re_path(r'^api/editsubcategory_data',subcategory_view.EditSubCategory_Data),
    re_path(r'^api/editsubcategory_icon',subcategory_view.EditSubCategory_Icon),
    
    re_path(r'^api/brand_submit',brand_view.Brand_Submit),
    re_path(r'^api/brand_list',brand_view.Brand_List),
    re_path(r'^api/edit_branddata',brand_view.Edit_BrandData),
    re_path(r'^api/edit_brandicon',brand_view.Edit_BrandIcon),
    re_path(r'^api/delete_branddata',brand_view.Delete_BrandData),
    re_path(r'^api/product_submit',product_view.Product_Submit),
    
    re_path(r'^api/product_list',product_view.Product_List),
    re_path(r'^api/editproduct_icon',product_view.EditProduct_Icon),
    re_path(r'^api/editproduct_data',product_view.EditProduct_Data),
    re_path(r'^api/delete_product',product_view.Delete_Product),
    re_path(r'^api/subCat_list_by_MainCatId',product_view.SubCat_list_by_MainCatId),
    
    re_path(r'^api/p_submit',productdetail_view.P_Submit),
    re_path(r'^api/p_list_by_subcat',productdetail_view.P_List_by_SCat),
    re_path(r'^api/brand_List_by_P',productdetail_view.Brand_List_by_P),
    re_path(r'^api/productdetail_list', productdetail_view.ProductDetail_List),
    re_path(r'^api/editproductdetail_icon', productdetail_view.EditProductDetail_Icon),
    re_path(r'^api/editproductdetail_data', productdetail_view.EditProductDetail_Data),
    re_path(r'^api/deleteproductdetaildata', productdetail_view.DeleteProductDetail_Data),
 
    re_path(r'^api/banner_submit',banner_view.Banner_Submit),
    # admin
    re_path(r'^api/check_admin_login',adminlogin_view.Check_Adminlogin),
    # user
    re_path(r'^api/user_maincategory_list',userinterface.User_MainCategory_List),
    re_path(r'^api/user_subCat_list_by_mainCatId',userinterface.User_SubCat_list_by_MainCatId),
    re_path(r'^api/user_brand_list',userinterface.User_Brand_List),
    re_path(r'^api/banner_list',userinterface.Banner_List),
    re_path(r'^api/user_subcategory_list',userinterface.User_SubCategory_List),
    re_path(r'^api/all_brand_list',userinterface.All_Brand_List),
    re_path(r'^api/user_productdetail_list',userinterface.User_ProductDetail_List),
    re_path(r'^api/user_product_list',userinterface.User_Product_List),
    re_path(r'^api/user_p_list_by_mcat',userinterface.User_P_List_by_MCat),
    # re_path(r'^api/product_list_by_subcat',userinterface.User_P_List_by_SubCat)
    re_path(r'^api/dispaly_product_by_id',userinterface.Dispaly_product_by_Id),
    re_path(r'^api/custmer_submit',userinterface.custmer_Submit),
    re_path(r'^api/check_user_login',userinterface.Check_User_login),
    re_path(r'^api/fetch_user_address', userinterface.FetchUserAddress),
    re_path(r'^api/address_submit', userinterface.Address_Submit)

]
