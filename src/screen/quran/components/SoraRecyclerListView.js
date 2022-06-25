import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { RecyclerListView } from "recyclerlistview"
import AyaComponents from './AyaComponents';

RecyclerListView.propTypes.externalScrollView = PropTypes.object;

const SoraRecyclerListView = ({ updatePage, updateJozz, dataProvider, layoutProvider, favoriteBook, ...rest }) => {

  const rowRenderer = (type, item, index) => {
    return <AyaComponents
      item={item}
      key={item.aya_no}
      type={type}
      index={index}
      updatePage={updatePage}
      favoriteBook={favoriteBook}
    />
  }

  return (
    <RecyclerListView
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      showsVerticalScrollIndicator={false}
      onVisibleIndicesChanged={(all, b, c) => {
        if (!favoriteBook) {
          updatePage(all[all.length - 1])
          updateJozz(all[all.length - 1])
        }
      }}
      {...rest}
    />
  )
}

export default memo(SoraRecyclerListView)

const styles = StyleSheet.create({})