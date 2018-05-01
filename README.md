# Elastic Particles
## Building blocks for Elastic queries, filters, and aggregations which can be re-used, combined, and nested. In other words, it's an elasticsearch query builder.
### Documentation: 
#### <v2 http://jharri34.github.io/elastic-particles/
#### >v2 https://github.com/3choBoomer/elastic-particles/wiki

## basic usage

    
    let locationTermQuery = new ep.TermQuery('age', 23);
    let genderTermQuery = new ep.TermQuery('gender', 'M');

    let boolMustQuery = new ep.BoolQuery().must([locationTermQuery, genderTermQuery]);

    //each helper method on ElasticQuery returns iteself to support chaining.
    let esQuery = new ep.ElasticQuery()
      .setQuery(boolMustQuery)
      .setSize(100)
      .setSort('personId')
      .setIncludeFields(['personId', 'gender', 'age', 'zipcode'])
      .addAggregation(new ep.TermsAgg('zipcode'));
      
      
    elasticClient.search(esQuery.serialize());
