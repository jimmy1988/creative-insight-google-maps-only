<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrontEndPagesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
      parent::__construct();
      // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(){
        return view('frontend.pages.welcome');
    }
}
