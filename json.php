<?php
# Add and structure your php code as you feel appropriate

# For simplicity have the classes here, normaly they would be in their own class file.
abstract class Dataprovider {

  protected function fetch( $party, $business_day, $search, $sorting ) {
    # Normally here would come some SQL to fetch the data from the database, 
    # but for this test we will just get a staic data set now.
    $data = require('_dataset.php');
    return $this->applyFilterAndSort( $data, $party, $business_day, $search, $sorting );
  }

  protected function applyFilterAndSort( $data, $party, $business_day, $search, $sorting ) {
    # Here comes the non-sql filtering condition and sorting if implemented server side
    return $data;
  }

  abstract public function process( $party, $business_day, $search, $sorting );
}
class DataproviderJson extends Dataprovider {
  function process( $party, $business_day, $search, $sorting ) {
    header('Content-Type: application/json');
    echo json_encode( $this->fetch( $party, $business_day, $search, $sorting ) );
  }
}

# call dataprovider to produce the JSON data
$dataprovider = new DataproviderJson;
$dataprovider->process( isset($_REQUEST['party']), isset($_REQUEST['business_day']), isset($_REQUEST['search']), isset($_REQUEST['sorting']) );
